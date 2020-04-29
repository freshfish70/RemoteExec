<template>
	<b-modal
		id="abba"
		centered
		header-class="no-border"
		footer-class="no-border"
		body-class="py-0"
		content-class="component-background"
	>
		<template v-slot:modal-header="{ close }">
			<h5 class="modal-title">Add executable</h5>
		</template>

		<template v-slot:default="{ hide }">
			<b-form class="no-wrap">
				<b-form-group
					label="Description"
					label-for="execution-description"
				>
					<b-form-input
						id="execution-description"
						class="input-stripped"
						type="text"
						required
						placeholder="Execution description"
					></b-form-input>
					<b-form-invalid-feedback
						:state="false"
						class="modal-form-feedback"
						id="execution-desciption-feedback"
						>{{ error }}</b-form-invalid-feedback
					>
				</b-form-group>
				<b-form-group label="Executable" label-for="execution-name">
					<b-form-input
						id="executable-name"
						class="input-stripped"
						type="text"
						required
						placeholder="Executable (app.sh)"
					></b-form-input>
					<b-form-invalid-feedback
						:state="false"
						class="modal-form-feedback"
						id="execution-name-feedback"
						>{{ error }}</b-form-invalid-feedback
					>
				</b-form-group>

				<b-form-group
					label="Executable path"
					label-for="execution-path"
				>
					<b-form-input
						id="execution-path"
						class="input-stripped"
						type="text"
						required
						placeholder="Executable path (/bin/)"
					></b-form-input>
					<b-form-invalid-feedback
						:state="false"
						class="modal-form-feedback"
						id="execution-path-feedback"
						>{{ error }}</b-form-invalid-feedback
					>
				</b-form-group>

				<b-form-group label="Arguments" label-for="execution-arguments">
					<b-form-input
						id="execution-arguments"
						class="input-stripped"
						type="text"
						required
						placeholder="Executable arguments (-rf)"
					></b-form-input>
				</b-form-group>

				<b-form-group
					label="Execution delay (ms)"
					label-for="execution-delay"
				>
					<b-form-input
						id="execution-delay"
						class="input-stripped"
						type="number"
						required
					></b-form-input>
					<b-form-invalid-feedback
						:state="false"
						class="modal-form-feedback"
						id="execution-delay-feedback"
						>{{ error }}</b-form-invalid-feedback
					>
				</b-form-group>
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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
/**
 * ExecutableModal is responsible for editing/creating executables for clients
 */
export default class ExecutableModal extends Vue {
	error: string = 'Fields is required'
}
</script>
