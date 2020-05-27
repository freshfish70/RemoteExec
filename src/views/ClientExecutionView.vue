<template>
	<div id="page-content">
		<section id="content-top" class="no-border">
			<b-form inline class="no-wrap">
				<b-form-input
					id="execution-name"
					class="w-25 mr-5 py-3 input-stripped"
					type="text"
					required
					placeholder="Group execution name"
					:value="groupExecution ? groupExecution.name : ''"
					v-on:update="updateGroupExecutionName"
				></b-form-input>

				<b-form-input
					id="execution-description"
					class="w-100 py-3 input-stripped"
					type="text"
					required
					placeholder="Description"
					:value="groupExecution ? groupExecution.description : ''"
					v-on:update="updateGroupExecutionDescription"
				></b-form-input>
			</b-form>
		</section>
		<section id="content" class="d-flex flex-column">
			<b-table
				borderless
				class="table-spaced"
				:items="executables"
				:fields="fields"
			>
				<template v-slot:cell(select)="data">
					<div
						class="text-center cursor-pointer"
						@click="removeExecutable(data.item)"
					>
						<i class="fas fa-times red-color"></i>
					</div>
				</template>
				<template v-slot:cell(executable)="data">
					{{ data.item.executableApplication.application }}
				</template>
				<template v-slot:cell(arguments)="data">
					{{ data.item.executableApplication.arguments }}
				</template>
				<template v-slot:cell(status)="data">
					<span
						:class="
							getProcessStateTextColor(
								data.item.executableApplication.processState
							)
						"
					>
						{{
							getStateNameString(
								data.item.executableApplication.processState
							)
						}}</span
					>
				</template>

				<template v-slot:cell(state)="data">
					<div class="text-center cursor-pointer ">
						<i
							class="fas fa-play green-color"
							@click="startProcess(data.item)"
							v-if="
								canStartProcess(
									data.item.executableApplication.processState
								)
							"
						></i>
						<i
							class="fas fa-stop red-color"
							@click="stopProcess(data.item)"
							v-else
						></i>
					</div>
				</template>
				<template v-slot:cell(edit)="data">
					<div
						v-b-modal.abba
						@click="selectExecutable(data.item.id)"
						class="cursor-pointer text-center"
					>
						<i class="fas fa-pen"></i>
					</div>
				</template>
			</b-table>
			<div class="align-self-center text-center d-flex flex-column">
				<div
					v-b-modal.abba
					@click="clearSelectedExecutable"
					class="cursor-pointer"
				>
					<img
						class="add-item-image mb-2"
						src="/images/icons/add.png"
					/><br />
					<span>Add executable</span>
				</div>
			</div>
		</section>
		<executableModal
			:existingExecutable="selectedExecutable"
			:userid="'5'"
			@on-updated="modalUpdate"
		/>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import ExecutableModal from '@/components/ExecutableModal.vue'
import TitleMixin from '@/mixins/TitleMixin'
import ProcessMixin from '@/mixins/ProcessMixin'
import { Client } from '@/lib/client/Client'
import { ExecuteableApplication } from '@/lib/Execution/ExecuteableApplication'
import { ProcessState } from '@/lib/Execution/ProcessState'
import { ClientGroupExecution } from '@/lib/Execution/ClientGroupExecution'
import { Executable } from '@/lib/Execution/Executable'
import { GroupExecution } from '@/lib/Execution/GroupExecution'
import { mixins } from 'vue-class-component'
import Clients from '@/store/modules/Clients'

@Component({
	components: {
		executableModal: ExecutableModal,
		confirmationModal: ConfirmationModal,
	},
	title: 'Client execution',
	subtitle: 'Execution',
	mixins: [TitleMixin, ProcessMixin],
})
export default class ClientExecutionView extends mixins(
	TitleMixin,
	ProcessMixin
) {
	private client: Client | undefined

	private clientId!: string

	private groupExecution: ClientGroupExecution | undefined | null = null

	private executables: Array<Executable> | undefined = []

	private selectedExecutable: Executable | undefined | null = null

	private fields = [
		{ key: 'select', label: '', thClass: 'table-icon-column' },
		{
			key: 'executable',
		},
		{
			key: 'arguments',
		},
		{
			key: 'delay',
		},
		{
			key: 'status',
		},
		{
			key: 'state',
			label: 'Run',
			thClass: 'table-icon-column',
		},
		{
			key: 'edit',
			thClass: 'table-icon-column',
		},
	]

	created() {
		this.clientId = this.$route.params.id
		this.client = Clients.client(this.clientId)
		if (!this.client) return this.$router.push('/')
		this.$options.title = this.client
			? this.client.name
			: '#Invalid client id'

		this.groupExecution = this.client.getGroupExecutionById(
			this.$route.params.exid
		)
		if (this.groupExecution) {
			this.executables = Array.from(
				this.groupExecution.executables.values()
			)
		}
	}

	modalUpdate(executable: { new: boolean; executable: Executable | null }) {
		if (executable.executable == null) return
		if (!this.client || !this.groupExecution) return
		if (executable.new) {
			this.client.executions.push(
				executable.executable.executableApplication
			)
			this.client.addExecutableToGroupExecutionById(
				this.$route.params.exid,
				executable.executable
			)

			this.executables = Array.from(
				this.groupExecution.executables.values()
			)
		}

		Clients.saveClient(this.clientId)
	}

	private selectExecutable(id: string) {
		this.selectedExecutable = this.findExecutable(id)
	}

	private clearSelectedExecutable() {
		this.selectedExecutable = null
	}

	private findExecutable(id: string) {
		if (!this.executables) return

		return this.executables.find(ex => {
			return ex.id == id
		})
	}

	private removeExecutable(executable: Executable) {
		this.$bvModal
			.msgBoxConfirm('Are you sure ?')
			.then(confirmed => {
				if (confirmed) {
					if (!this.client || !this.groupExecution) return
					this.client.removeExecutableFromGroupExecutionById(
						this.$route.params.exid,
						executable
					)

					this.executables = Array.from(
						this.groupExecution.executables.values()
					)

					Clients.saveClient(this.clientId)
				}
			})
			.catch(err => {})
	}

	private startProcess(executable: Executable) {
		Clients.startProcess({ clientId: this.clientId, executable })
	}

	private stopProcess(executable: Executable) {
		Clients.stopProcess({ clientId: this.clientId, executable })
	}

	private updateGroupExecutionName(newName: string) {
		// TODO: VALIDATE INPUT< MUST BE > 1
		this.groupExecution!.name = newName
	}

	private updateGroupExecutionDescription(newDescription: string) {
		// TODO: VALIDATE INPUT< MUST BE > 1
		this.groupExecution!.description = newDescription
	}
}
</script>
<style lang="scss" scoped>
input[type='text'],
input[type='text']:focus {
	height: 3.2rem;
	margin: -0.7rem 0 0 0;
}
</style>
