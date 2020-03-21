<template>
	<div id="app-main">
		<sidebar />
		<main id="main-container" class="container-fluid">
			<section class="title-header">
				<h1 id="page-title">{{ appState.title }}</h1>
				<h3 id="page-subtitle">{{ appState.subtitle }}</h3>
			</section>
			<router-view />
		</main>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/menu/sidebar.vue'
import { getModule } from 'vuex-module-decorators'
import { App } from '../store/modules/App'

@Component({
	components: {
		sidebar: Sidebar,
	},
})
export default class MainView extends Vue {
	public appState = getModule(App, this.$store)
}
</script>
