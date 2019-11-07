import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import { boot } from '@/loaders'

async function start() {
	let applicationBoot = await boot(store)

	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
}

start()
