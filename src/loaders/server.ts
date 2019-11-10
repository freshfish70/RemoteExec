import net, { Socket } from 'net'
import { createClient } from '@/service/network/createJsonSocket'
import { ClientProcessor } from '@/service/network/ClientProcessor'
import { Store } from 'vuex'
import { config } from '@/config'
import { ProtocolParser } from '@/service/protocol/ProtocolParser'
import { PublicKeyPayload } from '@/types/protocol/PublicKeyPayload'
import { TweetCrypto } from '@/service/security/TweetCrypto'
/**
 * Initialize the server and
 * @param store Vuex store
 */
export const createServer = async function createServer(store: Store<{}>) {
    const crypto = new TweetCrypto()
    const parser = new ProtocolParser()
    const processor = new ClientProcessor(parser, crypto)

    parser.registerActions(
        'publicKey',
        (clientid: string, payload: PublicKeyPayload) => {
            if (!payload) return
            let key = new Uint8Array(Object.values(payload))
            processor.enableEncryptionForClient(clientid, key)
        }
    )

    parser.registerActions(
        'authenticate',
        (clientid: string, payload: PublicKeyPayload) => {
            if (payload) {
                console.log(payload)
            }
        }
    )

    parser.registerActions(
        'executed',
        (clientid: string, payload: PublicKeyPayload) => {
            if (payload) {
                console.log(payload)
            }
        }
    )

    parser.registerActions(
        'processStatus',
        (clientid: string, payload: PublicKeyPayload) => {
            if (payload) {
                console.log(payload)
            }
        }
    )

    let server = new net.Server((socket: Socket) => {
        createClient(socket, processor)
    })

    // !NEEDS TO BE TRIGGERED BY UI
    server.listen(config.network.port)
}
