import Store from 'electron-store'
import { Client } from '@/lib/client/Client'
import { StoredClient } from '@/lib/client/StoredClient'
import { MultiExecutable } from '@/types/Processes/MultiExecutable'
import { Application } from '@/types/Processes/Application'

/**
 * Store for basic app data which is not sensitive.
 */
let storage = new Store({
	name: 'config',
	fileExtension: 'dontedit',
	clearInvalidConfig: false,
	encryptionKey: '',
})

class Storage {
	private _store: Store

	constructor(store: Store) {
		this._store = store
	}

	protected get store(): Store {
		return this._store
	}
}
class GeneralStorage extends Storage {
	constructor(store: Store) {
		super(store)
	}

	getClients() {
		return this.store.get('clients') as Array<StoredClient>
	}

	saveClients(clients: Array<Client>) {
		let transformedClients: Array<StoredClient> = []

		for (const client of clients) {
			let storedClient: StoredClient = {
				name: '',
				id: '',
				ipAddresses: {
					ipv4: '',
					ipv6: '',
				},
				firstSeen: '',
				lastSeen: '',
				validExecutionFolders: [],
				groupExecutions: [],
			}

			storedClient.name = client.name
			storedClient.id = client.id
			storedClient.ipAddresses = client.ipAddresses
			storedClient.firstSeen = client.firstSeen
			storedClient.lastSeen = client.lastSeen

			let groupExecutions = []
			for (const groupExecution of client.groupExecutions) {
				let transformedGroupExecution: MultiExecutable = {
					name: '',
					description: '',
					executables: [],
				}

				transformedGroupExecution.name = groupExecution.name
				transformedGroupExecution.description =
					groupExecution.description

				let applications: Array<Application> = []
				for (const ex of groupExecution.executables.values()) {
					const app = {
						eid: ex.executableApplication.eid,
						name: ex.executableApplication.name,
						description: ex.executableApplication.description,
						application: ex.executableApplication.application,
						path: ex.executableApplication.path,
						arguments: ex.executableApplication.arguments,
					}
					applications.push(app)
					let executable = {
						id: ex.id,
						delay: ex.delay,
						executableApplication: app,
					}
					transformedGroupExecution.executables.push(executable)
				}

				groupExecutions.push(transformedGroupExecution)
			}
			storedClient.groupExecutions = groupExecutions

			transformedClients.push(storedClient)
		}
		return this.store.set('clients', transformedClients)
	}
}
const generalStorage = new GeneralStorage(storage)
export { generalStorage }
