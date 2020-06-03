import { Client } from '@/service/network/Client'
import { v4 as uuidv4 } from 'uuid'

import ClientStore from '@/store/modules/Clients'
import { Client as FrontClient } from '@/lib/client/Client'
import { ExecutableTree } from '@/types/Clients/ExecutableTree'

type SetupPayload = {
	id?: string
	name: string
	executableTree: Array<ExecutableTree>
}

type SetupCompletePayload = {
	id: string
}

/**
 * Creates a new client and adds the client to the store
 * @param name name of the client
 */
function createClient(name: string = 'Unnamed'): FrontClient {
	const id = uuidv4()
	const client = new FrontClient(name, id)
	client.connected = true
	ClientStore.addClient(client)
	return client
}

export default (client: Client, payload: SetupPayload) => {
	let frontClient: FrontClient

	if (!payload.id) {
		frontClient = createClient(payload.name)
	} else {
		const client = ClientStore.client(payload.id)
		if (!client) {
			frontClient = createClient(payload.name)
		}
		frontClient = client as FrontClient
	}

	const currentTime = new Date().toISOString()
	frontClient.connected = true
	frontClient.firstSeen = currentTime
	frontClient.lastSeen = currentTime
	frontClient.validExecutionFolders = payload.executableTree

	client.socket.on('close', () => {
		frontClient.connected = false
	})
}
