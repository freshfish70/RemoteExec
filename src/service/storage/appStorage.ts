import Store from 'electron-store'
/**
 * Store for app sensitive data, like
 * paths, passwords, IP whitelist etc.
 *
 * Setups the store if it is not initialized. If it is
 * try to get the initialized value from the sore; it will return undefined
 * if the password is wrong, hence wrong password.
 * And will throw and Error if it cant open the storage.
 */
const appStorage = (password: string, initialize: boolean) => {
	let passwordBuffer = Buffer.from(password)
	let storage = new Store({ name: 'app', encryptionKey: passwordBuffer })
	if (initialize) {
		storage.set('initialized', true)
	}

	let opened = storage.get('initialized')
	if (!opened) throw new Error('Could not open secure storage.')
	return {
		remove,
		set,
	}
}

export { appStorage }

// Remove functions
const remove = {
	whitelist: {
		// Remove IP(s) from the whitelist
		ip: (ip: Array<string>) => {},
	},
	client: {
		// Remove WOL address from client
		wol: () => {},
		// Remove one app from a sequence
		app: (sequence: number) => {},
		// Remove a whole sequence
		sequence: () => {},
	},
}

const set = {
	whitelist: {
		// adds an IP to the whitelist
		ip: () => {},
	},
	client: {
		// Add WOL address to client
		wol: () => {},
		// Add one app to a sequence
		app: (sequence: number) => {},
		// Add new sequence
		sequence: () => {},
	},
	batch: {
		// Adds a batch sequence
		sequence: () => {},
	},
	app: {
		// Set the app password
		password: () => {},
		// Set auth password
		authPassword: () => {},
	},
}
