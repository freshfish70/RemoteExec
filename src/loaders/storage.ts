import { secureStore } from '@/service/storage/secureStore'
import { generalStore } from '@/service/storage/generalStore'
import { Store } from 'vuex'

export const storage = (store: Store<{}>) => {
	function initGeneralStorage() {
		try {
			return generalStore()
		} catch (error) {
			console.log('Error general storage')
			console.log(error)
		}
	}

	function initSecureStorage(password: string) {
		try {
			return secureStore(password)
		} catch (error) {
			console.log('Error reading secure storage')
			console.log(error)
		}
	}

	return {
		initGeneralStorage,
		initSecureStorage,
	}
}
