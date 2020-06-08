import { Client } from '@/service/network/Client'
import { v4 as uuidv4 } from 'uuid'

import { ExecutableTree } from '@/types/Clients/ExecutableTree'

import ClientStoreBinder from '@/service/binder/ClientStoreBinder'
import clientStoreBinder from '@/service/binder/ClientStoreBinder'

type SetupPayload = {
	id: string
	name: string
	executableTree: Array<ExecutableTree>
}

type SetupCompletePayload = {
	id: string
}

export default (client: Client, payload: SetupPayload) => {
	let id = payload.id

	if (clientStoreBinder.clientExists(id)) {
		ClientStoreBinder.clientConnected(id)
	} else {
		id = uuidv4()
		clientStoreBinder.createNewClient(payload.name, id)
	}

	client.id = id

	client.socket.on('close', () => {
		clientStoreBinder.clientDisconnected(id)
	})
}
