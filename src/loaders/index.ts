import { logger } from '@/loaders/logger'
import { createServer } from '@/loaders/server'
import { storage } from './storage'
import storageLoader from './storageLoader'

/**
 * Starts application loaders.
 *
 * Application loaders handles initialization
 * of services required by the application.
 * @param store Vuex store
 */
export const boot = async function boot() {
	storageLoader()
	const server = await createServer()
}
