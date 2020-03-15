<template>
	<div class="align-self-center text-center d-flex flex-column">
		<router-link to="#">
			<img class="add-item-image mb-2" src="/images/icons/add.png" />
		</router-link>
		<span>{{ text }}</span>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AddExecutable extends Vue {
	// https://github.com/kaorun343/vue-property-decorator/issues/81#issuecomment-399997760
	@Prop(String) text!: string
}
</script>
