import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {
		test: (e, wer) => {
			console.log(wer)
		}
	},
	actions: {},
	modules: {}
})
