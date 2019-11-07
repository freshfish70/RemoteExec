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

	private state: ClientState = ClientState.HANDSHAKING

	/**
	 * Name of the client
	 */
	private _name: string = 'unnamed'

	/**
	 * ID of the client
	 */
	private _id: string

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
}
