import { JsonSocketProtocol } from './JsonSocketProtocol'
import { ClientState } from './ClientState'
import uuid from 'uuid/v1'

/**
 * Represents a connected client,
 * a client is created when a connection is established.
 * Every client gets an unique ID when they're created.
 *
 * @author Christoffer A Træen
 */
export class Client {
	private _socket: JsonSocketProtocol

	private _state: ClientState = ClientState.HANDSHAKING

	/**
	 * Name of the client
	 */
	private _name: string = 'unnamed'

	/**
	 * ID of the client
	 */
	private _id: string

	/**
	 * Public encryption key of the client
	 */
	private _publicKey: Uint8Array | undefined

	/**
	 * Server/client shared key
	 */
	private _sharedKey: Uint8Array | undefined

	constructor(socket: JsonSocketProtocol) {
		this._socket = socket
		this._id = uuid()
	}

	/**
	 * Returns the clients id
	 */
	get id() {
		return this._id
	}
	/**
	 * Returns the clients name
	 */
	get name() {
		return this._name
	}
	/**
	 * Returns the clients socket
	 */
	get socket() {
		return this._socket
	}
	/**
	 * Returns the public key for the client,
	 * or empty Uint8array if no key is set.
	 */
	get publicKey(): Uint8Array {
		return this._publicKey ? this._publicKey : new Uint8Array()
	}
	/**
	 * sets the public key for the client.
	 */
	set publicKey(key: Uint8Array) {
		this._publicKey = key
	}
	/**
	 * Returns the shared key between client and server, or empty
	 * uint8array if the key is not set
	 */
	get sharedKey(): Uint8Array {
		return this._sharedKey ? this._sharedKey : new Uint8Array()
	}
	/**
	 * sets the shared key between client and server.
	 */
	set sharedKey(key: Uint8Array) {
		this._sharedKey = key
	}

	/**
	 * Returns true if client is authenticated else false
	 */
	public isAuthenticated() {
		return this._state == ClientState.AUTHENTICATED ? true : false
	}

	/**
	 * Returns true if client is handshaking else false
	 */
	public isHandshaking() {
		return this._state == ClientState.HANDSHAKING ? true : false
	}
}
