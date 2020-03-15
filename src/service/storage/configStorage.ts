import Store from 'electron-store'

let configStorageInstance: Store
/**
 * Store for basic app data which is not sensitive.
 */
const configStorage = () => {
	let storage = new Store({ name: 'config' })
	let created = storage.get('create')
	if (!created) storage.set('created', true)
	configStorageInstance = storage

	return {
		get,
		set,
	}
}

export { configStorage }

// Get functions
const get = {
	initialized: () => {
		return configStorageInstance.get('secureInitialized') ? true : false
	},
}

// Set functions
const set = {
	initialized: () => configStorageInstance.set('secureInitialized', true),
}
