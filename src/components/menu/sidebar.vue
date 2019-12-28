<template>
	<nav id="main-menu" class="drop-shadow">
		<section id="menu-top">
			<sidebar-item
				:to="'/'"
				:image="'back.png'"
				:hover="false"
			></sidebar-item>
		</section>
		<section id="menu-center">
			<sidebar-item
				:to="'/app'"
				:image="'client.png'"
				:text="'Clients'"
			></sidebar-item>

			<sidebar-item
				:to="'/app/sequences'"
				:image="'sequence.png'"
				:text="'Sequences'"
			></sidebar-item>

			<sidebar-item
				:to="'/app/settings'"
				:image="'settings.png'"
				:text="'Settings'"
			></sidebar-item>
		</section>
		<section id="menu-bottom">
			<sidebar-item
				:to="'/app/login'"
				:image="'logout.png'"
				:text="'Logout'"
			></sidebar-item>
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
