<template>
	<b-modal
		id="abba"
		centered
		header-class="no-border"
		footer-class="no-border"
		body-class="py-0"
		v-model="show"
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
						:value="description"
						v-model="description"
						placeholder="Execution description"
					></b-form-input>
					<b-form-invalid-feedback
						:state="$v.description.required"
						class="modal-form-feedback"
						id="execution-desciption-feedback"
						>{{ validatorText.required() }}</b-form-invalid-feedback
					>
				</b-form-group>
				<b-form-group label="Executable" label-for="execution-name">
					<b-form-input
						id="executable-name"
						class="input-stripped"
						type="text"
						required
						:value="executable"
						v-model="executable"
						placeholder="Executable (app.sh)"
					></b-form-input>
					<b-form-invalid-feedback
						:state="$v.executable.required"
						class="modal-form-feedback"
						id="execution-name-feedback"
						>{{ validatorText.required() }}</b-form-invalid-feedback
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
						:value="path"
						v-model="path"
						placeholder="Executable path (/bin/)"
					></b-form-input>
					<b-form-invalid-feedback
						:state="$v.path.required"
						class="modal-form-feedback"
						id="execution-path-feedback"
						>{{ validatorText.required() }}</b-form-invalid-feedback
					>
				</b-form-group>

				<b-form-group label="Arguments" label-for="execution-arguments">
					<b-form-input
						id="execution-arguments"
						class="input-stripped"
						type="text"
						required
						:value="args"
						v-model="args"
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
						:value="delay"
						v-model="delay"
					></b-form-input>
					<b-form-invalid-feedback
						:state="$v.delay.required"
						class="modal-form-feedback"
						id="execution-delay-feedback"
						>{{ validatorText.required() }}</b-form-invalid-feedback
					>
					<b-form-invalid-feedback
						:state="$v.delay.numeric"
						class="modal-form-feedback"
						id="execution-delay-feedback"
						>{{ validatorText.required() }}</b-form-invalid-feedback
					>
				</b-form-group>
			</b-form>
		</template>

		<template v-slot:modal-footer>
			<b-button
				class="uppercase"
				size
				variant="primary"
				:disabled="$v.$invalid"
				@click="onUpdated"
				>save</b-button
			>
			<b-button class="uppercase" variant="danger" @click="close"
				>cancle</b-button
			>
		</template>
	</b-modal>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { ProcessState } from '@/lib/Execution/ProcessState'
import { PropType } from 'vue'
import { watch } from 'fs'
import { Executable } from '@/lib/Execution/Executable'
import { ExecuteableApplication } from '@/lib/Execution/ExecuteableApplication'
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import { getValidatorText } from '@/lib/Validation/getValidatorText'

/**
 * ExecutableModal is responsible for editing/creating executables for clients
 */
@Component({
	mixins: [validationMixin],
	validations: {
		description: {
			required,
		},
		executable: {
			required,
		},
		path: {
			required,
		},
		delay: {
			required,
			numeric,
		},
	},
})
export default class ExecutableModal extends Vue {
	@Prop({
		type: Object as PropType<Executable>,
		required: false,
		validator: (executable: Executable) => {
			if (executable) {
				return true
			}
			return false
		},
	})
	existingExecutable: Executable | undefined

	@Prop({
		type: String,
		required: true,
		validator: (userid: string) => {
			if (userid.length > 0) {
				return true
			}
			return false
		},
	})
	userid: string | undefined

	private description: string = ''
	private executable: string = ''
	private path: string = ''
	private args: string = ''
	private delay: number = 0
	private show = false
	private validatorText = getValidatorText()

	@Emit()
	onUpdated(): { new: boolean; executable: Executable | null } {
		let returnState: { new: boolean; executable: Executable | null } = {
			new: false,
			executable: null,
		}
		if (!this.existingExecutable && !this.$v.$invalid) {
			let ea = new ExecuteableApplication(
				Math.random().toString(),
				this.executable,
				this.description,
				this.executable,
				this.path,
				this.args
			)
			let newExecutable = new Executable(ea, this.delay)
			returnState = { new: true, executable: newExecutable }
			this.clearFields()
		} else if (this.existingExecutable) {
			this.existingExecutable.executableApplication.description = this.description
			this.existingExecutable.executableApplication.application = this.executable
			this.existingExecutable.executableApplication.path = this.path
			this.existingExecutable.executableApplication.arguments = this.args
			this.existingExecutable.delay = this.delay
			returnState = { new: false, executable: this.existingExecutable }
		}
		this.close()
		return returnState
	}

	private close() {
		this.show = false
	}

	private clearFields() {
		this.description = ''
		this.executable = ''
		this.path = ''
		this.args = ''
		this.delay = 0
	}

	@Watch('existingExecutable')
	updateExisting(ex: Executable | undefined) {
		if (!ex) {
			this.clearFields()
		} else {
			this.description = ex.executableApplication.description
			this.executable = ex.executableApplication.application
			this.path = ex.executableApplication.path
			this.args = ex.executableApplication.arguments
			this.delay = ex.delay
		}
	}
}
</script>
