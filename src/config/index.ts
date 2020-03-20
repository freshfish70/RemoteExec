/**
 * Parses env variables from .env file,
 * and expose a config object.
 */
const dotenv = require('dotenv').config()

if (dotenv.error) {
	throw dotenv.error
}

const env = process.env

/**
 * Application config object
 */
export const config = {
	network: {
		port: dotenv.parsed.SERVER_PORT,
	},
}
