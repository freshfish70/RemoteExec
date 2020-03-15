<template>
	<b-modal
		id="executionModalForm"
		centered
		header-class="no-border"
		footer-class="no-border"
		body-class="py-0"
		content-class="component-background"
	>
		<template v-slot:modal-header="{ close }">
			<h5 class="modal-title">executable</h5>
		</template>

		<template v-slot:default="{ hide }">
			<b-form class="no-wrap">
				<b-form-group>
					<b-form-input
						id="execution-name"
						class="input-stripped"
						type="text"
						required
						placeholder="Execution name"
					></b-form-input>
					<b-form-invalid-feedback
						:state="false"
						class="modal-form-feedback"
						id="execution-name-feedback"
						>{{ error }}</b-form-invalid-feedback
					>
				</b-form-group>

				<b-form-input
					id="execution-description"
					class="mb-5 input-stripped"
					type="text"
					required
					placeholder="Execution description"
				></b-form-input>
			</b-form>
		</template>

		<template v-slot:modal-footer="{ ok, cancel, hide }">
			<b-button class="uppercase" size variant="primary" @click="ok()"
				>save</b-button
			>
			<b-button class="uppercase" variant="danger" @click="cancel()"
				>cancle</b-button
			>
		</template>
	</b-modal>
</template>
<script>
/**
 * Bootstrap modal component
 * Opened with  v-b-modal.executionModalForm on a component
 */
export default {
	data() {
		return {
			error: 'This filed is required!',
		}
	},
}
</script>
