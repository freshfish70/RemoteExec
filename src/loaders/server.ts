import net, { Socket } from 'net'
import { createClient } from '@/service/network/createJsonSocket'
import { ClientProcessor } from '@/service/network/ClientProcessor'
import { Store } from 'vuex'
import { config } from '@/config'
import { ProtocolParser } from '@/service/protocol/ProtocolParser'
import { PublicKeyPayload } from '@/types/protocol/PublicKeyPayload'
import { TweetCrypto } from '@/service/security/TweetCrypto'
import { Client } from '@/service/network/Client'
import { BoxKeyPair } from 'tweetnacl'

/**
 * Initialize the server and
 * @param store Vuex store
 */
export const createServer = async function createServer(store: Store<{}>) {
	const crypto = new TweetCrypto()
	const parser = new ProtocolParser()
	const processor = new ClientProcessor(parser)

	/**
	 * Holds the key pair for the server
	 */
	const _serverKeys: BoxKeyPair = crypto.generateKeyPair()

	parser.registerActions(
		'publicKey',
		(client: Client, payload: PublicKeyPayload) => {
			if (!payload || !client.isHandshaking()) return
			let key = new Uint8Array(Object.values(payload))

			const sharedkey = crypto.generateSharedKey(
				key,
				_serverKeys.secretKey
			)

			client.publicKey = key
			client.sharedKey = sharedkey

			const encryptor = (data: string) => {
				return crypto.encryptWithSharedKey(data, sharedkey)
			}
			const decryptor = (data: string) => {
				return crypto.decryptWithSharedKey(data, sharedkey)
			}
			client.socket.setEncryptorAndDecryptor(encryptor, decryptor)
			client.socket.write({ pubkey: _serverKeys.publicKey })
			client.socket.setEncryptionState(true)
		}
	)

	parser.registerActions(
		'authenticate',
		(client: Client, payload: PublicKeyPayload) => {
			if (client.isAuthenticated()) return // TODO RETURN ERROR MESSAGE
			if (payload) {
				console.log(payload)
			}
		}
	)

	parser.registerActions(
		'executed',
		(client: Client, payload: PublicKeyPayload) => {
			if (!client.isAuthenticated()) return // TODO RETURN ERROR MESSAGE
			if (payload) {
				console.log(payload)
			}
		}
	)

	parser.registerActions(
		'processStatus',
		(client: Client, payload: PublicKeyPayload) => {
			if (!client.isAuthenticated()) return // TODO RETURN ERROR MESSAGE
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
