import {
	VuexModule,
	Module,
	Mutation,
	Action,
	getModule,
} from 'vuex-module-decorators'
import Vue from 'vue'
import store from '../index'
import { Getter } from 'vuex-class'

/**
 * App states
 */
@Module({ store, namespaced: true, name: 'App', dynamic: true })
export class App extends VuexModule {
	public title: string = ''
	public subtitle: string = ''

	@Mutation
	public setTitle(title: string) {
		this.title = title
	}

	@Mutation
	public setSubtitle(subtitle: string) {
		this.subtitle = subtitle
	}
}

export default getModule(App)
