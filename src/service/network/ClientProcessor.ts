import { Client } from './Client'
import { ClientPayload } from '../../types/protocol/ClientPayload'
import { ProtocolParser } from '../protocol/ProtocolParser'

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
     * ProtocolParser
     */
    private _parser: ProtocolParser

    /**
     * Initialize the emitter and sets the store
     * @param store Vuex store
     */
    constructor(parser: ProtocolParser) {
        this._parser = parser
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
     * Returns a client with given id.
     * @param cliendId the clientid of the client to find
     */
    public getClient(cliendId: string): Client | undefined {
        return this._clients.get(cliendId)
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
     * Notifies the UI of a client disconnection.
     * Also removes the client from the pool.
     * @param clientid the client id
     */
    public clientDisconnected(clientid: string) {
        //!TODO: NOTIFY REMOVAL OF CLIENT
        this.removeClient(clientid)
        console.log('Client disocnnect: ' + clientid)
    }

    /**
     * Handles the data to be sent
     * @param data data to send
     */
    public send(clientid: string, data: Object) {
        const client = this.getClient(clientid)

        if (client) {
            client.socket.write(data)
        }
    }
}
