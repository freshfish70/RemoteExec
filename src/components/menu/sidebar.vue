<template>
	<nav id="main-menu" class="drop-shadow">
		<section id="menu-top">
			<sidebar-item :image="'back.png'"></sidebar-item>
		</section>
		<section id="menu-center">
			<sidebar-item :image="'client.png'"></sidebar-item>

			<sidebar-item :image="'sequence.png'"></sidebar-item>

			<sidebar-item :image="'file.png'"></sidebar-item>

			<sidebar-item :image="'settings.png'"></sidebar-item>
		</section>
		<section id="menu-bottom">
			<sidebar-item :image="'logout.png'"></sidebar-item>
		</section>
	</nav>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from '@/components/menu/sidebar-item.vue'

@Component({
	components: {
		sidebarItem: SidebarItem,
	},
})
export default class Sidebar extends Vue {}
</script>
