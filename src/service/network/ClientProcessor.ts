import { Client } from './Client'
import { ClientPayload } from '../../types/protocol/ClientPayload'
import { ProtocolParser } from '../protocol/ProtocolParser'
import { PayloadSender } from '@/types/Network/PayloadSender'
import { ErrorPayload } from '@/types/Network/ErrorPayload'
import { DataPayload } from '@/types/Network/DataPayload'

/**
 * The client processor is responsible for managing messages between client
 * and server and delegating the actions to where they should go.
 *
 * @author Christoffer Andersen Træen
 */
export class ClientProcessor implements PayloadSender {
	/**
	 * Holds all connected clients.
	 */
	private _clients: Set<Client> = new Set()

	/**
	 * ProtocolParser
	 */
	private _parser: ProtocolParser

	/**
	 * Initialize the emitter and sets the store
	 */
	constructor(parser: ProtocolParser) {
		this._parser = parser
	}

	/**
	 * Adds a client to the client pool
	 */
	public addClient(client: Client) {
		this._clients.add(client)
	}

	/**
	 * Removes a client from the pool.
	 * @param client the client to remove
	 */
	private removeClient(client: Client) {
		this._clients.delete(client)
	}

	/**
	 * Returns a client with given id.
	 * @param cliendId the id of the client to find
	 */
	public getClientById(cliendId: string): Client | undefined {
		for (const client of this._clients.values()) {
			return client.id === cliendId ? client : undefined
		}
	}

	/**
	 * Handles the recieved data
	 * @param data recieved data
	 */
	public recieve(client: Client, data: ClientPayload) {
		this._parser.parse(client, data)
	}

	/**
	 * Handles socket errors
	 * @param error error object
	 */
	public socketError(clientId: string, error: Error) {
		//!TODO HANDLE SOCKET ERROR
	}

	/**
	 * Remove the client from connected pool
	 * @param clientid the client disconnected
	 */
	public clientDisconnected(client: Client) {
		this.removeClient(client)
	}

	/**
	 * Sends a payload to the client with provided id
	 * @param id the of the client
	 * @param data the data to send, either an error or data payload
	 */
	public sendPayload(id: string, data: ErrorPayload | DataPayload): void {
		const client = this.getClientById(id)

		if (client) {
			client.socket.write(data)
		}
	}
}
