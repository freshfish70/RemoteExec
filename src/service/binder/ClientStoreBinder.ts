import ClientsStore from '@/store/modules/Clients'
import { ClientProcessesState } from '@/types/Execution/ClientProcessState'
import { Client } from '@/lib/client/Client'
import { ExecutableTree } from '@/types/Clients/ExecutableTree'

/**
 * Client store binder is a communication layer from client sockets to vuex
 * clients store
 */
class ClientStoreBinder {
	/**
	 * Creates and inserts a new client into the store.
	 * @param name name of the new client
	 * @param id id of the new client
	 */
	createNewClient(name: string, id: string): void {
		const currentTime = new Date().toISOString()
		const newClient = new Client(name, id)
		newClient.firstSeen = currentTime
		newClient.lastSeen = currentTime
		newClient.connected = true

		ClientsStore.addClient(newClient)
	}

	/**
	 * Checks of the client already exists on the server
	 * @param clientId id of the client
	 */
	clientExists(clientId: string): boolean {
		return ClientsStore.client(clientId) ? true : false
	}

	/**
	 * Updates a clients processes states
	 * @param newStatesForClient client processes states
	 */
	updateProcessStatusForClient(
		newStatesForClient: ClientProcessesState
	): void {
		ClientsStore.updateClientMultipleProcessesState(newStatesForClient)
	}

	/**
	 * Updates a clients allowd executable folders and files
	 * @param tree the tree strcuture of allowd folders and files
	 */
	updateExecutableTreeForClient(tree: Array<ExecutableTree>): void {}

	/**
	 * Sets the cliets connection state to disconnected
	 * @param clientId id if the disconnected client
	 */
	clientDisconnected(clientId: string): void {
		ClientsStore.setConnectedState({ clientId, connected: false })
	}

	/**
	 * Sets the cliets connection state to connected
	 * @param clientId id if the connected client
	 */
	clientConnected(clientId: string): void {
		ClientsStore.setConnectedState({ clientId, connected: true })
	}
}

const clientStoreBinder = new ClientStoreBinder()

export default clientStoreBinder
