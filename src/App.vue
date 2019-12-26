<template>
	<div id="app">
		<sidebar />
		<main></main>
		<router-view />
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
export default class App extends Vue {}
</script>
