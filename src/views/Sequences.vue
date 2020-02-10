<template>
	<div id="page-content">
		<section id="content-top">
			<ul class="client-info">
				<li>129.123.123.232</li>
				<li>2001:db8:85a3:0:0:8a2e:370:7334</li>
			</ul>
		</section>
		<section id="content" class="">
			<b-table
				borderless
				class="table-compact"
				:items="items"
				:fields="fields"
			>
				<template v-slot:cell(running)="data">
					<div
						class="connection-state connected"
						v-if="data.value"
					></div>
					<div class="connection-state disconnected" v-else></div>
				</template>
				<template v-slot:cell(toggle)="data">
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
				<template v-slot:cell(view)="data">
					<router-link to="/app/client/4/execution/IDHERE"
						><img class="toggle-image" src="/images/icons/eye.png"
					/></router-link>
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
			executable: 'test.exe',
			arguments: '-arg 1 fullscreen',
			delay: '5',
			status: 'running',
			run: true,
		},
		{
			executable: 'text.exe',
			arguments: '-arg 1 fullscreen',
			delay: '6',
			status: 'Waiting',
			run: false,
		},
		{
			executable: 'test.exe',
			arguments: '-arg 1 fullscreen',
			delay: '2        ',
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
