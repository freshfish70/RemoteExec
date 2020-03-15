<template>
	<div id="page-content">
		<section id="content-top" class="no-border">
			<b-form inline class="no-wrap">
				<b-form-input
					id="execution-name"
					class="w-25 mr-5 py-3 input-stripped"
					type="text"
					required
					placeholder="Eexitxecution name"
				></b-form-input>

				<b-form-input
					id="execution-description"
					class="w-100 py-3 input-stripped"
					type="text"
					required
					placeholder="Execution description"
				></b-form-input>
			</b-form>
		</section>
		<section id="content" class="d-flex flex-column">
			<div class="b-container table-superheader">
				<b-row>
					<b-col>
						<div
							class="connection-state connected inline-block"
						></div>
						<h2 class="inline-block">Client 2</h2>
					</b-col>
					<b-col
						class="d-flex align-items-center justify-content-center"
					>
						<span>5 min</span></b-col
					>
					<b-col></b-col>
				</b-row>
			</div>
			<b-table
				borderless
				class="table-spaced"
				:items="items"
				:fields="fields"
			>
				<template v-slot:cell(select)="data">
					<b-form-checkbox />
				</template>
				<template v-slot:cell(run)="data">
					<img
						class="toggle-image"
						src="/images/icons/play.png"
						v-if="data.value"
					/>
					<img
						class="toggle-image"
						src="/images/icons/stop.png"
						v-else
					/>
				</template>
				<template v-slot:cell(edit)>
					<div v-b-modal.executionModalForm>
						<img class="toggle-image" src="/images/icons/pen.png" />
					</div>
				</template>
			</b-table>
		</section>
	</div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/card/card'
import ExecutionFormModal from '@/components/ExecutionFormModal.vue'
@Component({
	components: {
		clientCard: Card,
		executionFormModal: ExecutionFormModal,
	},
})
export default class Sequences extends Vue {
	fields = [
		{ key: 'select', label: '', thClass: 'table-icon-column' },
		{
			key: 'sequence',
		},
		{
			key: 'clients',
		},
		{
			key: 'status',
			thClass: 'table-icon-column',
		},
		{
			key: 'run',
			thClass: 'table-icon-column',
		},
		{
			key: 'edit',
			thClass: 'table-icon-column',
		},
	]
	items = [
		{
			sequence: 'Awesome simulation',
			clients: 'Client1, Client 2',
			status: 'running',
			run: true,
		},
		{
			sequence: 'Random software',
			clients: 'Client1, Client 2',
			status: 'Waiting',
			run: false,
		},
		{
			sequence: 'Awesome simulation',
			clients: 'Client1, Client 2',
			status: 'Stopped',
			run: true,
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
