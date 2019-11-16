import { Duplex } from 'stream'
import { Socket } from 'net'
import { logger } from '@/loaders/logger'

/**
 * JsonSocket is a socket extenstion of
 * NodeJs socket to be able to parse JSON
 * directly out from a socket stream.
 *
 * It extends Duplex which enables full control
 * of read and write of the stream

 * Inspired by>
 * https://github.com/bmancini55/node-playpen/blob/master/custom-socket/json-socket.js
 *
 * @author Christoffer A Træen
 */

interface Encrypt {
	(data: string): string
}
interface Decrypt {
	(data: string): string
}

export class JsonSocketProtocol extends Duplex {
	/**
	 * TCP Socket connection
	 */
	private socket: Socket

	/**
	 * TBD
	 */
	private readingPaused: boolean = false

	/**
	 * Max size for a package
	 * Which is the size in bytes 2 ^ packageMaxSize
	 */
	private packageMaxSize: number = 17

	/**
	 * The lengthg of the first bytes which holds the
	 * size/length of the JSON data
	 */
	private lengthPackageByteSize: number = 4

	/**
	 * Flag to tell wheter encryption is enabled or
	 */
	private encryptionEnabled: boolean = false

	/**
	 * Encryptor method
	 */
	private encryptor: Encrypt | undefined

	/**
	 * Decrypter method
	 */
	private decryptor: Decrypt | undefined

	/**
	 * Set stream to objet mode and set the socket.
	 * @param socket TCP socket connection
	 */
	constructor(socket: Socket) {
		super({ objectMode: true })
		this.socket = socket
		this.bindSocketEvents(socket)
	}

	public setEncryptorAndDecryptor(
		encryptor: (data: string) => string,
		decryptor: (data: string) => string
	): void {
		this.encryptor = encryptor
		this.decryptor = decryptor
	}

	public setEncryptionState(enabled: boolean) {
		this.encryptionEnabled = enabled
	}

	/**
	 * Binds the TCP socket to all available Stream evets
	 * @param socket TCP socket
	 */
	private bindSocketEvents(socket: Socket): void {
		this.socket.on('connect', () => this.emit('connect'))
		this.socket.on('close', hadError => this.emit('close', hadError))
		this.socket.on('drain', () => this.emit('drain'))
		this.socket.on('end', () => this.emit('end'))
		this.socket.on('error', err => this.emit('error', err))
		this.socket.on('lookup', (err, address, family, host) => this.emit('lookup', err, address, family, host)); // prettier-ignore
		this.socket.on('ready', () => this.emit('ready'))
		this.socket.on('timeout', () => this.emit('timeout'))
		this.socket.on('readable', this.onReadable.bind(this))
	}

	/**
	 * Connects a socket to a specific host and port
	 * @param param0 host and port
	 */
	connect({ host, port }: { host: string; port: number }) {
		this.bindSocketEvents(new Socket())
		this.socket.connect({ host, port })
		return this
	}

	/**
	 * Stream reader, handles the reading of new data.
	 * This is triggered by the underlying 'reabable' event
	 * when there is new data.
	 */
	private onReadable(): void {
		// Read all the data until one of two conditions is met
		// 1. there is nothing left to read on the socket
		// 2. reading is paused because the consumer is slow
		while (!this.readingPaused) {
			// First step is reading the 32-bit integer from the socket
			// and if there is not a value, we simply abort processing
			let lengthBuffer = this.socket.read(this.lengthPackageByteSize)
			if (!lengthBuffer) return

			// Now that we have a length buffer we can convert it
			// into a number by reading the UInt32BE value
			// from the buffer.
			let dataLength = lengthBuffer.readUInt32BE()

			// ensure that we don't exceed the max size of 256KiB
			if (dataLength > 2 ** this.packageMaxSize) {
				this.socket.destroy(new Error('Max length exceeded'))
				return
			}

			// With the length, we can then consume the rest of the body.
			let body = this.socket.read(dataLength)

			// If we did not have enough data on the wire to read the body
			// we will wait for the body to arrive and push the length
			// back into the socket's read buffer with unshift.
			if (!body) {
				this.socket.unshift(lengthBuffer)
				return
			}

			// Try to parse the data and if it fails destroy the socket.
			let data
			try {
				if (this.encryptionEnabled) {
					if (!this.decryptor)
						throw new Error(
							'Socket has not registered an Encryptor'
						)
					data = this.parse(this.decryptor(body))
				} else {
					data = this.parse(body)
				}
			} catch (error) {
				logger.error(error)
				this.socket.destroy()
				return
			}
			// Push the data into the read buffer and capture whether
			// we are hitting the back pressure limits
			let pushOk = this.push(data)

			// When the push fails, we need to pause the ability to read
			// messages because the consumer is getting backed up.
			if (!pushOk) this.readingPaused = true
		}
	}

	/**
	 * Parses a JSON string, if it fails to parse.
	 * Disconnect the client.
	 * @param jsonString jsonstring to be parsed
	 */
	public parse(jsonString: string) {
		let json
		try {
			json = JSON.parse(jsonString)
		} catch (ex) {
			throw new Error('Client did not pass a valid JSON.')
		}
		return json
	}

	/**
	 * Implementation of {Readable} stream method.
	 * Called by the cunsumer when reading data.
	 * Flag reading to not paused.
	 */
	_read(): void {
		this.readingPaused = false
		setImmediate(this.onReadable.bind(this))
	}

	/**
	 * Implementation of {Readable} write method.
	 * Serialize the data and write the data to the underlying socket.
	 * @param dataObject The data object
	 * @param encoding // https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings
	 * @param callback callback method
	 */
	_write(
		dataObject: object,
		encoding: string = 'utf8',
		callback?: (err?: Error) => void
	) {
		let json = JSON.stringify(dataObject)
		if (this.encryptionEnabled) {
			if (!this.encryptor) return
			json = this.encryptor(json)
		}
		let dataSize = Buffer.byteLength(json)
		let buffer = Buffer.alloc(this.lengthPackageByteSize + dataSize)
		buffer.writeUInt32BE(dataSize, 0)
		buffer.write(json, 4)
		this.socket.write(buffer, encoding, callback)
	}

	/**
	 * Implementation of {Readable} final method.
	 *
	 * @param callback callback method
	 */
	_final(callback: () => void) {
		this.socket.end(callback)
	}
}
