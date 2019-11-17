import EStore from 'electron-store'
/**
 * Store for app sensitive data, like
 * paths, passwords, IP whitelist etc.
 */
const appStorage = (password: string) => {
	let passwordBuffer = Buffer.from(password)
	return new EStore({ name: 'app', encryptionKey: passwordBuffer })
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
