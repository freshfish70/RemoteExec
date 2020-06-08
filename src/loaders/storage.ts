import { secureStore } from '@/service/storage/secureStore'
import { generalStorage } from '@/service/storage/generalStore'

export const storage = () => {
	function initGeneralStorage() {
		try {
			return generalStorage
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
