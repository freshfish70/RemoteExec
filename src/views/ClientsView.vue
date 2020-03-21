<template>
	<div id="page-content">
		<section id="content-top"></section>
		<section id="content" class="">
			<div v-if="this.clients.length == 0">
				<h2>No clients...</h2>
			</div>
			<div class="client-group">
				<router-link
					v-for="client in clients"
					v-bind:key="client.id"
					:to="'/app/client/' + client.id"
				>
					<b-card
						class="drop-shadow"
						img-top
						style="max-width: 25rem; min-width: 22rem;"
					>
						<div
							class="connection-state"
							:class="[
								client.connected ? `connected` : `disconnected`,
							]"
						></div>
						<b-card-title>{{ client.name }}</b-card-title>
						<b-card-text>
							{{
								client.ipAddresses.ipv4
									? client.ipAddresses.ipv4
									: 'Missing ipv4 address'
							}}<br />
							{{
								client.ipAddresses.ipv6
									? client.ipAddresses.ipv6
									: 'Missing ipv6 address'
							}}
						</b-card-text>
					</b-card>
				</router-link>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VuexModule } from 'vuex-module-decorators'
import Card from '@/components/card/card.vue'
import TitleMixin from '@/mixins/TitleMixin'
import { Client } from '@/lib/client/Client'
import { namespace } from 'vuex-class'
const clients = namespace('Clients')

@Component({
	components: {
		clientCard: Card,
	},
	title: 'Clients',
	subtitle: 'Connected and disconnected',
	mixins: [TitleMixin],
})
export default class ClientsView extends Vue {
	@clients.State
	public clients!: Array<Client>
}
</script>
<style lang="scss"></style>
