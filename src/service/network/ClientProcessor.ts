import { EventEmitter } from 'events'
import { JsonSocketProtocol } from './JsonSocketProtocol'
import { Store } from 'vuex'
import { DataPackage } from './PackageType'
import { Socket } from 'net'
import { Client } from './Client'

/**
 * The client processor is responsible for managing messages between client
 * and server and delegating the actions to where they should go.
 *
 * @author Christoffer Andersen Træen
 */
export class ClientProcessor {
	/**
	 * Holds all active clients.
	 * the key is their ID
	 */
	private _clients: Map<string, Client> = new Map()

	/**
	 * Vuex store
	 */
	private _store: Store<{}>

	/**
	 * Initialize the emitter and sets the store
	 * @param store Vuex store
	 */
	constructor(store: Store<{}>) {
		this._store = store
	}

	/**
	 * Adds a client to the client pool
	 */
	public addClient(client: Client) {
		this._clients.set(client.id, client)
	}

	/**
	 * Removes a client from the pool.
	 * @param cliendId the id of the client
	 */
	private removeClient(cliendId: string) {
		this._clients.delete(cliendId)
	}

	/**
	 * Handles the recieved data
	 * @param data recieved data
	 */
	public recieve(clientid: string, data: DataPackage) {
		this.parse(data)
	}

	/**
	 * Handles socket errors
	 * @param error error object
	 */
	public socketError(clientId: string, error: Error) {
		//!TODO HANDLE SOCKET ERROR
	}

	/**
	 * Notifies the UI of a client disconnection.
	 * Also removes the client from the pool.
	 * @param clientid the client id
	 */
	public clientDisconnected(clientid: string) {
		//!TODO: NOTIFY REMOVAL OF CLIENT
		this._clients.delete(clientid)
		console.log('Client disocnnect: ' + clientid)
	}

	/**
	 * Handles the data to be sent
	 * @param data data to send
	 */
	public send(clientid: string, data: Object) {}

	private parse(data: DataPackage): void {
		//TODO HANDLE CLIENT DATA
		console.log(data)
	}
}
