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
<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Card from '@/components/card/card.vue'
import TitleMixin from '../mixins/TitleMixin'
import { Client } from '../lib/client/Client'
import { Clients } from '@/store/modules/Clients'
import { State, Getter } from 'vuex-class'
import Component from 'vue-class-component'

@Component({
	components: {
		clientCard: Card,
	},
	subtitle: 'Client executions',
	mixins: [TitleMixin],
})
export default class ClientView extends Vue {
	@Getter('Clients/client')
	private getClient!: (clientId: string) => Client

	private client: Client | undefined

	public clientId!: string

	created() {
		this.clientId = this.$route.params.id
		this.client = this.getClient(this.clientId)
		this.$options.title = this.client
			? this.client.name
			: '#Invalid client id'
	}

	fields = [
		{
			key: 'running',
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
			key: 'view',
			thClass: 'table-icon-column',
		},
	]
	items = [
		{
			running: true,
			name: 'Application zero',
			description: 'application zero description',
			created: '23.03.2019',
			toggle: true,
		},
		{
			running: false,
			name: 'Application one',
			description: 'application one description',
			created: '23.03.2019',
			toggle: false,
		},
		{
			running: true,
			name: 'Application two',
			description: 'application two description',
			created: '23.03.2019',
			toggle: true,
		},
	]
}
</script>
<style lang="scss"></style>
