<template>
	<div id="page-content" v-if="client">
		<section id="content-top">
			<ul class="client-info">
				<li>{{ client.ipAddresses.ipv4 }}</li>
				<li>{{ client.ipAddresses.ipv6 }}</li>
			</ul>
		</section>
		<section id="content" class="">
			<b-table
				borderless
				class="table-compact"
				:items="groupExecutions"
				:fields="fields"
			>
				<template v-slot:cell(state)="data">
					<div
						class="connection-state"
						:class="getStateClass(data.value)"
					></div>
				</template>
				<template v-slot:cell(description)="data">
					{{ data.value }}
				</template>
				<template v-slot:cell(toggle)="data">
					<img
						class="toggle-image cursor-pointer"
						src="/images/icons/play.png"
						v-if="canStartGroupSequence(data.item.state)"
						@click="startGroup(data.item.id)"
					/>
					<img
						class="toggle-image  cursor-pointer"
						src="/images/icons/stop.png"
						@click="stopGroup(data.item.id)"
						v-else
					/>
				</template>
				<template v-slot:cell(id)="data">
					<router-link
						:to="`/app/client/${clientId}/execution/${data.value}`"
						><img class="toggle-image" src="/images/icons/eye.png"
					/></router-link>
				</template>
			</b-table>
			<div class="align-self-center text-center d-flex flex-column">
				<div class="cursor-pointer" @click="createAndGotoNewSequence">
					<img
						class="add-item-image mb-2"
						src="/images/icons/add.png"
					/><br />
					<span>Add sequence</span>
				</div>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import { Vue, Watch } from 'vue-property-decorator'
import Clients from '@/store/modules/Clients'
import Card from '@/components/card/card.vue'
import TitleMixin from '@/mixins/TitleMixin'
import { Client } from '@/lib/client/Client'
import Component from 'vue-class-component'
import { ExecuteableApplication } from '@/lib/Execution/ExecuteableApplication'
import { ProcessState } from '@/lib/Execution/ProcessState'
import { ClientGroupExecution } from '@/lib/Execution/ClientGroupExecution'
import { Executable } from '@/lib/Execution/Executable'
import { GroupExecution } from '@/lib/Execution/GroupExecution'

@Component({
	components: {
		clientCard: Card,
	},
	subtitle: 'Client executions',
	mixins: [TitleMixin],
})
export default class ClientView extends Vue {
	private client: Client | undefined

	public clientId!: string

	public groupExecutions: Array<ClientGroupExecution> = new Array()

	created() {
		this.clientId = this.$route.params.id
		this.client = Clients.client(this.clientId)

		if (!this.client) return this.$router.replace('/')
		this.$options.title = this.client.name

		this.groupExecutions = Vue.observable(this.client.groupExecutions)
	}

	createAndGotoNewSequence() {
		const ex = new ClientGroupExecution('', '')
		this.client?.groupExecutions.push(ex)
		this.$router.push({
			path: `/app/client/${this.clientId}/execution/${ex.id}`,
			query: { initial: 'true' },
		})
	}

	startGroup(item: any) {
		Clients.startGroupExecution({ clientId: this.clientId, groupId: item })
	}

	stopGroup(item: any) {
		Clients.stopGroupExecution({ clientId: this.clientId, groupId: item })
	}

	/**
	 * Returns the state class for the processes state
	 * Green/yellow/red background
	 */
	getStateClass(processState: ProcessState): string {
		let stateClass = ''
		switch (processState) {
			case ProcessState.RUNNING:
				stateClass = 'green-background'
				break
			case ProcessState.STARTED:
				stateClass = 'yellow-background'
				break
			default:
				stateClass = 'red-background'
				break
		}
		return stateClass
	}

	/**
	 * Returns true if can start the group sequence, else false
	 */
	canStartGroupSequence(processState: ProcessState): boolean {
		let canStart = false
		switch (processState) {
			case ProcessState.RUNNING:
			case ProcessState.STARTED:
				canStart = false
				break
			default:
				canStart = true
				break
		}
		return canStart
	}

	private fields = [
		{
			key: 'state',
			label: ' ',
			thClass: 'table-icon-column',
		},
		{
			key: 'name',
		},
		{
			key: 'description',
		},
		{
			key: 'created',
		},
		{
			key: 'toggle',
			thClass: 'table-icon-column',
		},
		{
			key: 'id',
			thClass: 'table-icon-column',
		},
	]
}
</script>
