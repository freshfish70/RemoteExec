<template>
	<router-link class="menu-item" :to="to">
		<img :src="'/images/icons/' + image" />
		<div v-if="hover" class="sidebar-hover">
			<span>{{ text }}</span>
		</div>
	</router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

const SidebarItemProps = Vue.extend({
	props: {
		image: String,
		text: String,
		to: String,
		hover: {
			type: Boolean,
			default: true,
		},
	},
})

@Component
export default class SidebarItem extends SidebarItemProps {}
</script>
