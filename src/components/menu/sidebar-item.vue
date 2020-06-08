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

@Component
export default class SidebarItem extends Vue {
	@Prop({ type: String })
	image!: String

	@Prop({ type: String })
	text!: String

	@Prop({ type: String })
	to!: String

	@Prop({ type: Boolean, default: true })
	hover!: boolean
}
</script>
