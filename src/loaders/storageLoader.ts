import Clients from '@/store/modules/Clients'
import { Client } from '@/lib/client/Client'
import { generalStorage } from '@/service/storage/generalStore'

/**
 * Loads all saved clients from storage into vuex Clients store
 */
function loadClients() {
	const loadedClients = generalStorage.getClients()
	const createdClients: Array<Client> = []
	if (loadedClients) {
		for (const client of loadedClients) {
			const createdClient = Object.assign(new Client(), client)
			createdClient.connected = false
			createdClients.push(createdClient)
		}
		Clients.setAndReplaceClients(createdClients)
	}
}

function load() {
	loadClients()
}

export default load
