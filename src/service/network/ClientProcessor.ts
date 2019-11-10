import { Client } from './Client'
import { ClientPayload } from '../../types/protocol/ClientPayload'
import { ProtocolParser } from '../protocol/ProtocolParser'
import { TweetCrypto } from '../security/TweetCrypto'
import { BoxKeyPair } from 'tweetnacl'

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
     * Cryptator
     */
    private _crypto: TweetCrypto

    /**
     * Holds the key pair for the server
     */
    private _serverKeys: BoxKeyPair

    /**
     * Initialize the emitter and sets the store
     * @param store Vuex store
     */
    constructor(parser: ProtocolParser, crypto: TweetCrypto) {
        this._parser = parser
        this._crypto = crypto
        this._serverKeys = crypto.generateKeyPair()
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
    public recieve(clientid: string, data: ClientPayload) {
        this._parser.parse(clientid, data)
    }

    /**
     * Enables encryption for the client, by settings the encrypt/decrypt
     * method on the network protocol handler. Keys are also assigned to
     * the client.
     *
     * @param clientid the client id to enable encryption for
     * @param publickey the public key of the client
     */
    public enableEncryptionForClient(clientid: string, publickey: Uint8Array) {
        const client = this.getClient(clientid)

        if (client) {
            if (client.sharedKey) return
            const sharedkey = this._crypto.generateSharedKey(
                publickey,
                this._serverKeys.secretKey
            )

            client.publicKey = publickey
            client.sharedKey = sharedkey

            const encryptor = (data: string) => {
                return this._crypto.encryptWithSharedKey(data, sharedkey)
            }
            const decryptor = (data: string) => {
                return this._crypto.decryptWithSharedKey(data, sharedkey)
            }
            client.socket.setEncryptorAndDecryptor(encryptor, decryptor)
            client.socket.write({ pubkey: this._serverKeys.publicKey })
            client.socket.setEncryptionState(true)
        }
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
