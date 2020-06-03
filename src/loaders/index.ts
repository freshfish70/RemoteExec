import { logger } from '@/loaders/logger'
import { createServer } from '@/loaders/server'
import { Store } from 'vuex'
import { storage } from './storage'

/**
 * Starts application loaders.
 *
 * Application loaders handles initialization
 * of services required by the application.
 * @param store Vuex store
 */
export const boot = async function boot() {
	const server = await createServer()
}
