import net, { Socket } from 'net'
import { createClient } from '@/service/network/createJsonSocket'
import { ClientProcessor } from '@/service/network/ClientProcessor'
import { Store } from 'vuex'
import { config } from '@/config'
/**
 * Initialize the server and
 * @param store Vuex store
 */
export const createServer = async function createServer(store: Store<{}>) {
	const processor = new ClientProcessor(store)

	let server = new net.Server((socket: Socket) => {
		createClient(socket, processor)
	})

	// !NEEDS TO BE TRIGGERED BY UI
	server.listen(config.network.port)
}
