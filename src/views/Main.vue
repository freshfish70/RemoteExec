<template>
	<div id="app-main">
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
export default class Index extends Vue {
	title: string = 'Title'
	subtitle: string = 'subtitle'
}
</script>
