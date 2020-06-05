import { Socket } from 'net'
import { JsonSocketProtocol } from '@/service/network/JsonSocketProtocol'
import { Client } from './Client'
import { ClientProcessor } from './ClientProcessor'

/**
 * Creates the client and jsonSocket
 * and assigns the nessecary events to the processor.
 * @param socket TCP socket
 */
export const createClient = (socket: Socket, processor: ClientProcessor) => {
	const jsonSocket = new JsonSocketProtocol(socket)
	const client = new Client(jsonSocket)

	jsonSocket.on('error', onError)
	jsonSocket.on('data', onData)
	jsonSocket.on('close', onClose)

	function onData(data: any) {
		processor.recieve(client, data)
	}

	function onError(error: Error) {
		processor.socketError(client.id, error)
	}

	/**
	 * Cleanup
	 */
	function onClose() {
		processor.clientDisconnected(client)
		jsonSocket.removeAllListeners('data')
		jsonSocket.removeAllListeners('error')
		jsonSocket.removeAllListeners('close')
	}

	processor.addClient(client)
}
