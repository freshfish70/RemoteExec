import Store from 'electron-store'

/**
 * Store for basic app data which is not sensitive.
 */

const storageSchema = {
	clients: {
		type: 'array',
		items: {
			type: 'object',
			propterties: {
				name: { type: 'string' },
				ip: {
					type: 'object',
					properties: {
						ipv4: { type: 'string' },
						ipv6: { type: 'string' },
					},
				},
				firstSeen: { type: 'string' },
				lastSeen: { type: 'string' },
				validExecutionFolders: {
					type: 'array',
					items: { type: 'string' },
				},
				executions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							eid: { type: 'number' },
							file: { type: 'string' },
							path: { type: 'string' },
							arguments: { type: 'string' },
							delay: { type: 'number' },
						},
					},
				},
			},
		},
		default: [],
	},
}
const generalStore = () => {
	let storage = new Store({
		name: 'config',
		fileExtension: '.dontedit',
		clearInvalidConfig: false,
		encryptionKey: ':justtolimitediting:',
	})

	return {
		get,
		set,
	}
}

export { generalStore }

// Get functions
const get = {}

// Set functions
const set = {}
