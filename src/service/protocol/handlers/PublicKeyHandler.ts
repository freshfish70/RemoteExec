import { Client } from '@/service/network/Client'

import { TweetCrypto } from '@/service/security/TweetCrypto'
import { BoxKeyPair } from 'tweetnacl'

const crypto = new TweetCrypto()

/**
 * Holds the key pair for the server
 */
const _serverKeys: BoxKeyPair = crypto.generateKeyPair()

export default (client: Client, payload: any) => {
	if (!payload || !client.isHandshaking()) return
	let key = Buffer.from(payload, 'base64')

	const sharedkey = crypto.generateSharedKey(key, _serverKeys.secretKey)

	client.publicKey = key
	client.sharedKey = sharedkey

	const encryptor = (data: string) => {
		return crypto.encryptWithSharedKey(data, client.sharedKey)
	}
	const decryptor = (data: string) => {
		return crypto.decryptWithSharedKey(data, client.sharedKey)
	}
	client.socket.setEncryptorAndDecryptor(encryptor, decryptor)
	client.socket.write({
		publicKey: Buffer.from(_serverKeys.publicKey).toString(`base64`),
	})
	client.socket.setEncryptionState(true)
}
