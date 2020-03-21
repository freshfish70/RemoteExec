import Vue from 'vue'
import Component from 'vue-class-component'
import { App } from '@/store/modules/App'
import { getModule } from 'vuex-module-decorators'

/**
 * Fetches the title and subtitle from the component the mixin is attached to,
 * and updates the Vuex App state with the title and subtitle provided by the
 * component options.
 */
@Component
export default class TitleMixin extends Vue {
	private appState = getModule(App, this.$store)

	mounted() {
		this.setTitle()
		this.setSubTitle()
	}

	private getTitle(vm: Vue) {
		const { title } = vm.$options
		if (title) {
			return typeof title === 'function' ? title.call(vm) : title
		}
	}
	private getSubtitle(vm: Vue) {
		const { subtitle } = vm.$options
		if (subtitle) {
			return typeof subtitle === 'function' ? subtitle.call(vm) : subtitle
		}
	}

	private setTitle() {
		const title = this.getTitle(this)
		if (title) {
			document.title = title
			this.appState.setTitle(title)
		}
	}

	private setSubTitle() {
		const subtitle = this.getSubtitle(this)
		if (subtitle) {
			this.appState.setSubtitle(subtitle)
		}
	}
}
