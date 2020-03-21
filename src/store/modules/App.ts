import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import Vue from 'vue'
import { Getter } from 'vuex-class'

/**
 * App states
 */
@Module({ namespaced: true, name: 'App' })
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
