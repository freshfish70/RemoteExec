import nacl, { box } from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

const decodeUTF8 = naclUtil.decodeUTF8,
	encodeUTF8 = naclUtil.encodeUTF8,
	encodeBase64 = naclUtil.encodeBase64,
	decodeBase64 = naclUtil.decodeBase64
/**
 * Simple wrapper around TweetNaCl, only wraps nessecary methods.
 * Handles encryption and decryption of data payloads.
 *
 * Encryption and decryption must be done with a public key from one peer
 * and the private key of the other peer.
 * A shared key can be generated and stored to be used to encrypt/decrypt.
 *
 * @author Christoffer A Træen
 */
export class TweetCrypto {
	/**
	 * Holds the box :D
	 */
	private box: box

	/**
	 * Assigns nacl box
	 */
	constructor() {
		this.box = nacl.box
	}

	/**
	 * Generates a key pair
	 */
	public generateKeyPair() {
		return this.box.keyPair()
	}

	/**
	 * Creates the full message including the nounce and the encrypted data and
	 * encodes it as Base64.
	 * @param encrypted encrypted message
	 * @param nonce the nounce used in ecryption
	 */
	private createMessage(encrypted: Uint8Array, nonce: Uint8Array): string {
		const message = new Uint8Array(nonce.length + encrypted.length)
		message.set(nonce)
		message.set(encrypted, nonce.length)
		return encodeBase64(message)
	}

	/**
	 * Extract the nounce and message created with {createMessage}.
	 * @param encryptedData encrypted data
	 */
	private extractNounceAndMessage(encryptedData: string) {
		const messageWithNonceAsUint8Array = decodeBase64(encryptedData)
		const nonce = messageWithNonceAsUint8Array.slice(
			0,
			this.box.nonceLength
		)
		const message = messageWithNonceAsUint8Array.slice(
			this.box.nonceLength,
			encryptedData.length
		)
		return { nonce, message }
	}

	/**
	 * Tries to encode the Uint8Array from the encypted data to UTF8.
	 * It throws Error if the message is null, which indicates it unsucsessfully
	 * decrypted the message.
	 * @param message the decrypted message
	 */
	private tryEncodeMessage(message: Uint8Array | null) {
		if (!message) {
			throw new Error('Message could not be encrypted')
		}
		return encodeUTF8(message)
	}

	/**
	 * Encrypts the data payload with a peers public key and the senders privet
	 * key and returns the encrypted payload.
	 * @param data data to encrypt
	 * @param peerPublicKey the key of the peer the data is sent to
	 * @param privateKey the key of the peer sending the data
	 */
	public encryptWithKeys(
		data: string,
		peerPublicKey: Uint8Array,
		privateKey: Uint8Array
	) {
		const nonce = this.generateNonce()
		const encrypted = this.box(
			decodeUTF8(data),
			nonce,
			peerPublicKey,
			privateKey
		)
		return this.createMessage(encrypted, nonce)
	}

	/**
	 * Encrypts the data payload with a pre generated shared key and returns the
	 * encrypted payload.
	 * @param data data to encrypt
	 * @param sharedKey shared key, created with createSharedkey
	 */
	public encryptWithSharedKey(data: string, sharedKey: Uint8Array) {
		const nonce = this.generateNonce()
		const encrypted = this.box.after(decodeUTF8(data), nonce, sharedKey)
		return this.createMessage(encrypted, nonce)
	}

	/**
	 * Decrypts a data payload with the senders public key and recievers
	 * private key and returns the message.
	 * @param encryptedData data to decrypt
	 * @param peerPublicKey the key of thhe peer the data is sent from
	 * @param privateKey the private key of the peer recieving the data
	 */
	public decryptWithKeys(
		encryptedData: string,
		peerPublicKey: Uint8Array,
		privateKey: Uint8Array
	) {
		const extracted = this.extractNounceAndMessage(encryptedData)
		const decrypted = box.open(
			extracted.message,
			extracted.nonce,
			peerPublicKey,
			privateKey
		)
		return this.tryEncodeMessage(decrypted)
	}

	/**
	 * Generates a precomputed shared key which can be used to encrypt and decrypt
	 * messages between the two peers.
	 */
	public generateSharedKey(
		peerPublicKey: Uint8Array,
		privateKey: Uint8Array
	) {
		return this.box.before(peerPublicKey, privateKey)
	}

	/**
	 * Decrypts a data payload with a predefined shared key and returns the message.
	 * @param encryptedData data to decrypt
	 * @param sharedKey shared key, created with createSharedkey
	 */
	public decryptWithSharedKey(encryptedData: string, sharedKey: Uint8Array) {
		const extracted = this.extractNounceAndMessage(encryptedData)
		const decrypted = box.open.after(
			extracted.message,
			extracted.nonce,
			sharedKey
		)
		return this.tryEncodeMessage(decrypted)
	}

	/**
	 * Generates a nonce
	 */
	public generateNonce(): Uint8Array {
		return nacl.randomBytes(this.box.nonceLength)
	}
}
