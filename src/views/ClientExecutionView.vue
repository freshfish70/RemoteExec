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
					<b-form-checkbox />
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
							getStateNameString(
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
					<img
						class="toggle-image"
						src="/images/icons/play.png"
						v-if="
							canStartProcess(
								data.item.executableApplication.processState
							)
						"
					/>
					<img
						class="toggle-image"
						src="/images/icons/stop.png"
						v-else
					/>
				</template>
				<template v-slot:cell(edit)>
					<div v-b-modal.abba>
						<img class="toggle-image" src="/images/icons/pen.png" />
					</div>
				</template>
			</b-table>
			<div class="align-self-center text-center d-flex flex-column">
				<router-link to="#">
					<img
						class="add-item-image mb-2"
						src="/images/icons/add.png"
					/>
				</router-link>
				<span>Add executable</span>
			</div>
		</section>
		<execution-form-modal />
		<executable-modal />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/card/card.vue'
import ExecutionFormModal from '@/components/ExecutionFormModal.vue'
import ExecutableModal from '@/components/ExecutableModal.vue'
import TitleMixin from '@/mixins/TitleMixin'
import ProcessMixin from '@/mixins/ProcessMixin'

import { Client } from '@/lib/client/Client'
import { State, Getter } from 'vuex-class'
import { ExecuteableApplication } from '@/lib/Execution/ExecuteableApplication'
import { ProcessState } from '@/lib/Execution/ProcessState'
import { ClientGroupExecution } from '@/lib/Execution/ClientGroupExecution'
import { Executable } from '@/lib/Execution/Executable'
import { GroupExecution } from '@/lib/Execution/GroupExecution'
import { mixins } from 'vue-class-component'

@Component({
	components: {
		clientCard: Card,
		executionFormModal: ExecutionFormModal,
		executableModal: ExecutableModal,
	},
	title: 'Client execution',
	subtitle: 'Execution',
	mixins: [TitleMixin, ProcessMixin],
})
export default class ClientExecutionView extends mixins(
	TitleMixin,
	ProcessMixin
) {
	@Getter('Clients/client')
	private getClient!: (clientId: string) => Client

	private client: Client | undefined

	private clientId!: string

	private groupExecution: ClientGroupExecution | undefined

	private executables: Array<Executable> | undefined

	created() {
		this.clientId = this.$route.params.id
		this.client = this.getClient(this.clientId)
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

	private createNew() {}

	private updateGroupExecutionName(newName: string) {
		// TODO: VALIDATE INPUT< MUST BE > 1
		this.groupExecution!.name = newName
	}

	private updateGroupExecutionDescription(newDescription: string) {
		// TODO: VALIDATE INPUT< MUST BE > 1
		this.groupExecution!.description = newDescription
	}

	fields = [
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
}
</script>
<style lang="scss" scoped>
input[type='text'],
input[type='text']:focus {
	height: 3.2rem;
	margin: -0.7rem 0 0 0;
}
</style>
