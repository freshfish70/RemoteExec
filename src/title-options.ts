import Vue from 'vue'

type StringCallback = () => string
// declare module 'vue/types/vue' {
// 	interface Vue {}
// }

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		title?: string | StringCallback
		subtitle?: string | StringCallback
	}
}
