import Vue from 'vue'
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router'
import Login from '../views/LoginView.vue'
import Main from '../views/MainView.vue'
import Clients from '../views/ClientsView.vue'
import Client from '../views/ClientView.vue'
import ClientExecution from '../views/ClientExecutionView.vue'
import Sequences from '../views/SequencesView.vue'
import GroupSequence from '../views/GroupSequenceView.vue'
import Settings from '../views/SettingsView.vue'

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
				path: 'client/:id',
				name: 'Client',
				component: Client,
				meta: {
					title: 'Client',
					subtitle: '',
				},
			},
			{
				path: 'client/:id/execution/:exid?',
				name: 'Client execution',
				component: ClientExecution,
				meta: {
					title: 'Execution sequence',
					subtitle: '',
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
				path: 'groupsequence/:id',
				name: 'Group sequence',
				component: GroupSequence,
				meta: {
					title: 'Group sequence',
					subtitle: 'group sequence',
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
