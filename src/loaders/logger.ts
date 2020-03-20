import bunyan from 'bunyan'
import fs from 'fs'

// Log directory location.
const logDirectory = __dirname + '/../../logs'

/**
 * Initilize the bunyan logger, and return the instance.
 *
 * Debug are logged to console;
 * Info is logged to file ./logs/info.log
 * Error is logged to file ./logs/error.log
 */
const logger = createLogger()

/**
 * Creates the logger and returns it,
 * and makes sure the logg directory is created/exists.
 */
function createLogger() {
	createLoggerDirectory((error: NodeJS.ErrnoException | null) => {
		if (error) {
			if (error.code != 'EEXIST') throw error
		}
	})

	const bun = bunyan.createLogger({
		name: 'RemoteExec',
		serializers: {
			req: require('bunyan-express-serializer'),
			res: bunyan.stdSerializers.res,
			err: bunyan.stdSerializers.err,
		},
		streams: [
			{
				level: 'debug',
				stream: process.stdout,
			},
			{
				level: 'info',
				path: logDirectory + '/info.log',
			},
			{
				level: 'error',
				path: logDirectory + '/error.log',
			},
		],
	})

	return bun
}

/**
 * Creates the logger directory.
 * Calls the callback if there are any errors.
 *
 * @param callback callback when there is an error creating the directory
 */
async function createLoggerDirectory(
	callback: (err: NodeJS.ErrnoException | null) => void
) {
	fs.mkdir(logDirectory, callback)
}

export { logger }
