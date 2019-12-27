<template>
	<div id="app">
		<sidebar />
		<main id="main-content" class="container-fluid">
			<section class="title-header">
				<h1 id="main-title">{{ title }}</h1>
				<h3 id="main-subtitle">{{ subtitle }}</h3>
			</section>
			<router-view />
		</main>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/menu/sidebar.vue'

@Component({
	components: {
		sidebar: Sidebar,
	},
})
export default class App extends Vue {
	title: string = ''
	subtitle: string = ''
	created() {
		this.setTitles()
	}

	setTitles() {
		this.title = this.$router.currentRoute.meta.title
		this.subtitle = this.$router.currentRoute.meta.subtitle
	}
}
</script>
