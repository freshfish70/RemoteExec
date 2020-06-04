import {
	VuexModule,
	Module,
	Mutation,
	Action,
	getModule,
} from 'vuex-module-decorators'
import { Client } from '@/lib/client/Client'
import store from '../index'
import Vue from 'vue'
import { ClientProcessState } from '@/types/Execution/ClientProcessState'
import { Executable } from '@/lib/Execution/Executable'

import { generalStorage } from '@/service/storage/generalStore'

/**
 * This module handles all clients connected/available
 * in local store.
 */
@Module({ store, namespaced: true, name: 'clients', dynamic: true })
export class Clients extends VuexModule {
	// Holds all clients available from storage / connected
	public clients: Array<Client> = new Array<Client>()

	public get client() {
		return (clientId: string) => {
			return this.clients.find(c => c.id == clientId)
		}
	}

	/**
	 * Adds a client to the store
	 * @param client the client to add
	 */
	@Mutation
	public addClient(client: Client) {
		this.clients.push(client)
		generalStorage.saveClients(this.clients)
	}

	/**
	 * Sets the stores clients to the provided array of clients.
	 * This will remove all clients currently in the store.
	 * @param clients clients to insert
	 */
	@Mutation
	public setAndReplaceClients(clients: Array<Client>) {
		this.clients = clients
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
	 * Sets a new state for the client process
	 * @param newState the new state of the client process
	 */
	@Mutation
	public updateClientProcessState(newState: ClientProcessState) {
		let i = this.clients.findIndex(c => c.id == newState.clientId)
		if (i != -1) {
			let app = this.clients[i].getExecutableApplication(newState.eid)
			if (app) app.processState = newState.state
		}
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

	@Action
	public saveClient(clientId: string) {
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) {
			// TODO: SAVE CLIENT TO FILE
			console.log('SAVING CLIENT')
		}
	}

	@Action
	public startProcess({
		clientId,
		executable,
	}: {
		clientId: string
		executable: Executable
	}) {
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) {
			//!TODO - SEND REQUEST TO CLIENT
			this.updateClientProcessState({
				clientId,
				eid: executable.executableApplication.eid,
				state: 0,
			}) // !REMOVE THIS LINE - LOCAL TEST
		}
	}

	@Action
	public stopProcess({
		clientId,
		executable,
	}: {
		clientId: string
		executable: Executable
	}) {
		let i = this.clients.findIndex(c => c.id == clientId)
		if (i != -1) {
			//!TODO - SEND REQUEST TO CLIENT
			this.updateClientProcessState({
				clientId,
				eid: executable.executableApplication.eid,
				state: 1,
			}) // !REMOVE THIS LINE - LOCAL TEST
		}
	}
}

export default getModule(Clients)
