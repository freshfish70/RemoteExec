import Vue from 'vue'
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

interface RouteConfigExtended extends RouteConfig {
	meta: {
		title: string
		subtitle: string
	}
}
const routes: RouteConfigExtended[] = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			title: 'Home',
			subtitle: 'home subtitle',
		},
	},
]

const router = new VueRouter({
	routes,
})

export default router
