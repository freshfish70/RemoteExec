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
		<section id="content" class="">
			<b-table
				borderless
				class="table-spaced"
				:items="items"
				:fields="fields"
			>
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
				<template v-slot:cell(edit)="data">
					<router-link to="/app/client/4/execution/IDHERE"
						><img class="toggle-image" src="/images/icons/pen.png"
					/></router-link>
				</template>
			</b-table>
			<div class="align-self-center text-center d-flex flex-column">
				<router-link to="#">
					<img class="add-item-image mb-2" src="/images/icons/add.png" />
				</router-link>
				<span>Add executable</span>
			</div>
		</section>
	</div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/card/card'

@Component({
	components: {
		clientCard: Card,
	},
})
export default class Client extends Vue {
	fields = [
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
			delay: 'application zero description',
			status: '23.03.2019',
			run: true,
		},
		{
			executable: 'text.exe',
			arguments: '-arg 1 fullscreen',
			delay: 'application one description',
			status: '23.03.2019',
			run: false,
		},
		{
			executable: 'test.exe',
			arguments: '-arg 1 fullscreen',
			delay: 'application two description',
			status: '23.03.2019',
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
