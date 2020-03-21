import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Client } from '@/lib/client/Client'
import Vue from 'vue'

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
	 * Remove the client from the vuex store, and propagte to
	 * remove client from the local database.
	 * @param clientId the client to remove
	 */
	@Mutation
	public removeClient(clientId: string) {
		// !TODO: Remove from actuale store
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) this.clients.splice(i, 1)
	}
	/**
	 * Sets the clients connected state > connected/disconected
	 * @param clientId the client to find
	 * @param connected true if client connected, else false
	 */
	@Mutation
	public setConnectedState({
		clientId,
		connected,
	}: {
		clientId: string
		connected: boolean
	}) {
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) {
			this.clients[i].connected = connected
		}
	}
}
