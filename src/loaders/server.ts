import net, { Socket } from 'net'
import { createClient } from '@/service/network/createJsonSocket'
import { ClientProcessor } from '@/service/network/ClientProcessor'
import { config } from '@/config'
import { ProtocolParser } from '@/service/protocol/ProtocolParser'
import { Client } from '@/service/network/Client'

import actionHandler from '@/service/protocol/handlers'

/**
 * Initialize the server
 */
export const createServer = async function createServer() {
	const parser = new ProtocolParser()
	const processor = new ClientProcessor(parser)
	const handler = actionHandler(processor)

	parser.registerActions('publicKey', (client: Client, payload: any) => {
		handler(client, payload)
			.preauthorizeAction()
			?.publicKey()
	})

	parser.registerActions('authenticate', (client: Client, payload: any) => {
		handler(client, payload)
			.preauthorizeAction()
			?.authenticate()
	})

	parser.registerActions('executed', (client: Client, payload: any) => {})

	parser.registerActions(
		'processStatus',
		(client: Client, payload: any) => {}
	)

	parser.registerActions('setup', (client: Client, payload: any) => {
		handler(client, payload)
			.authorizedAction()
			?.setup()
	})

	let server = new net.Server((socket: Socket) => {
		createClient(socket, processor)
	})

	// !NEEDS TO BE TRIGGERED BY UI
	server.listen(config.network.port)
}
