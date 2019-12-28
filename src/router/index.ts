import Vue from 'vue'
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Clients from '../views/Clients.vue'
import Sequences from '../views/Sequences.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

interface RouteConfigExtended extends RouteConfig {
	meta: {
		title: string
		subtitle: string
		protected?: boolean
	}
}
const routes: RouteConfigExtended[] = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		meta: {
			title: 'Login',
			subtitle: '',
			protected: false,
		},
	},
	{
		path: '/app',
		component: Main,
		meta: {
			title: '',
			subtitle: '',
			protected: true,
		},
		children: [
			{
				path: '/',
				name: 'Clients',
				component: Clients,
				meta: {
					title: 'Clients',
					subtitle: 'Clients',
				},
			},
			{
				path: 'sequences',
				name: 'Sequences',
				component: Sequences,
				meta: {
					title: 'Sequences',
					subtitle: 'sequences',
				},
			},
			{
				path: 'settings',
				name: 'Settings',
				component: Settings,
				meta: {
					title: 'Settings',
					subtitle: 'settings',
				},
			},
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
