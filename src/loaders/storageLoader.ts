import Clients from '@/store/modules/Clients'
import { Client } from '@/lib/client/Client'
import { generalStorage } from '@/service/storage/generalStore'
import { ExecuteableApplication } from '@/lib/Execution/ExecuteableApplication'
import { Executable } from '@/lib/Execution/Executable'
import { StoredClient } from '@/lib/client/StoredClient'

import { ClientGroupExecution } from '@/lib/Execution/ClientGroupExecution'

/**
 * Loads all saved clients from storage into vuex Clients store
 */
function loadClients() {
	const loadedClients: Array<StoredClient> = generalStorage.getClients()
	const createdClients: Array<Client> = []
	if (loadedClients) {
		for (const client of loadedClients) {
			let cl = new Client(client.name, client.id)

			for (const groupExecution of client.groupExecutions) {
				let newGroupExecution = new ClientGroupExecution(
					groupExecution.name,
					groupExecution.description
				)
				let executables = new Set<Executable>()
				for (const storedExecutable of groupExecution.executables) {
					let executableApp = new ExecuteableApplication(
						storedExecutable.executableApplication.eid,
						storedExecutable.executableApplication.name,
						storedExecutable.executableApplication.description,
						storedExecutable.executableApplication.application,
						storedExecutable.executableApplication.path,
						storedExecutable.executableApplication.arguments
					)
					let executable = new Executable(
						executableApp,
						storedExecutable.delay
					)
					cl.executions.push(executableApp)
					executables.add(executable)
				}
				newGroupExecution.executables = executables
				cl.addGroupExecution(newGroupExecution)
			}
			createdClients.push(cl)
		}
		Clients.setAndReplaceClients(createdClients)
	}
}

function load() {
	loadClients()
}

export default load
