import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Client } from '@/lib/client/Client'

/**
 * This module handles all clients connected/available
 * in local store.
 */
@Module({ namespaced: true, name: 'clients' })
export default class Clients extends VuexModule {
	// Holds all clients available from storage / connected
	public clients: Array<Client> = new Array<Client>()

	/**
	 * Adds a client to the store
	 * @param client the client to add
	 */
	@Mutation
	public addClient(client: Client) {
		this.clients.push(client)
	}
	/**
	 * Adds a client to the store
	 * @param client the client to add
	 */
	@Mutation
	public removeClient(clientId: string) {
		// !TODO: Remove from actuale store
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) this.clients.splice(i, 1)
	}
}
