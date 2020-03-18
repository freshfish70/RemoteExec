import Store from 'electron-store'
/**
 * Store for app sensitive data, like
 * paths, passwords, IP whitelist etc.
 *
 */

const storageSchema = {
	settings: {
		type: 'object',
		properties: {
			whitelist: { type: 'array', items: { type: 'string' } },
			listeningPort: { type: 'number' },
			authenticationPassword: { type: 'string' },
		},
		default: {
			whitelist: [],
			listeningPort: 66874,
			authenticationPassword: 'RemoteExec',
		},
	},
} as any

const secureStore = (password: string) => {
	let storage = new Store({
		name: 'app',
		encryptionKey: password,
		clearInvalidConfig: false,
		fileExtension: '.dontedit',
		schema: storageSchema,
	})

	return {
		remove,
		set,
	}
}

export { secureStore }

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
