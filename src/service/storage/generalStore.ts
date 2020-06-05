import Store from 'electron-store'
import { Client } from '@/lib/client/Client'

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
		return this.store.get('clients') as Array<Client>
	}

	saveClients(clients: Array<Client>) {
		return this.store.set('clients', clients)
	}
}
const generalStorage = new GeneralStorage(storage)
export { generalStorage }
