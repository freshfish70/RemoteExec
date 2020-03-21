<template>
	<div id="app-main">
		<sidebar />
		<main id="main-container" class="container-fluid">
			<section class="title-header">
				<h1 id="page-title">{{ title }}</h1>
				<h3 id="page-subtitle">{{ subtitle }}</h3>
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
export default class MainView extends Vue {
	title: string = 'Title'
	subtitle: string = 'subtitle'
}
</script>
