import { appStorage } from '@/service/storage/appStorage'
import { configStorage } from '@/service/storage/configStorage'

export const storage = () => {
	/**
	 * Initialize regular storage
	 * check if we have initialized the secure storage in regular storage field
	 * IF we have, prompt for the password
	 * 	Then when the user enters the right password,
	 * 	verify that we can open the storage by retrieving a key from the storage
	 * ELSE Make the user intput password, 2 times
	 * 	Then create a new stoage with initialize boolean set to true,
	 *   and pass the password, and set the secure storage field
	 *
	 */

	const config = configStorage()

	function initSecureStorage(password: string, initialize: boolean) {
		return appStorage(password, config.get.initialized())
	}

	return {
		config,
		initSecureStorage,
	}
}
