<template>
	<div id="page-content">
		<section id="content-top">
			<ul class="client-info">
				<li>129.123.123.232</li>
				<li>2001:db8:85a3:0:0:8a2e:370:7334</li>
			</ul>
		</section>
		<section id="content" class="d-flex flex-column">
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
