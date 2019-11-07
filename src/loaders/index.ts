import { logger } from '@/loaders/logger'
import { createServer } from '@/loaders/server'
import { Store } from 'vuex'

/**
 * Starts application loaders.
 *
 * Application loaders handles initialization
 * of services required by the application.
 * @param store Vuex store
 */
export const boot = async function boot(store: Store<{}>) {
	const server = await createServer(store)
}
