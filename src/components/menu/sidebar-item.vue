<template>
	<router-link class="menu-item" to="#">
		<img :src="'/images/icons/' + image" />
		<div class="sidebar-hover">HOVER ME</div>
	</router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

const SidebarItemProps = Vue.extend({
	props: {
		image: String,
	},
})

@Component
export default class SidebarItem extends SidebarItemProps {}
</script>
