import { Client } from '@/service/network/Client'
import { v4 as uuidv4 } from 'uuid'

import ClientStore from '@/store/modules/Clients'
import { Client as FrontClient } from '@/lib/client/Client'
import { ExecutableTree } from '@/types/Clients/ExecutableTree'

type SetupPayload = {
	id: string
	name: string
	executableTree: Array<ExecutableTree>
}

type SetupCompletePayload = {
	id: string
}

/**
 * Creates a new client
 * @param name name of the client
 */
function createClient(name: string = 'Unnamed'): FrontClient {
	const id = uuidv4()
	const client = new FrontClient(name, id)
	return client
}

export default (client: Client, payload: SetupPayload) => {
	const currentTime = new Date().toISOString()
	let storeClient = ClientStore.client(payload.id)
	let newClient = false
	if (!storeClient) {
		storeClient = createClient(payload.name)
		storeClient.firstSeen = currentTime
		newClient = true
	}

	storeClient.connected = true
	storeClient.lastSeen = currentTime
	storeClient.validExecutionFolders = payload.executableTree

	client.socket.on('close', () => {
		storeClient!.connected = false
	})

	if (newClient) {
		ClientStore.addClient(storeClient)
	}
}
