<template>
	<div id="testingpanel">
		<b-button id="hidebutton" v-on:click="togglePanel"
			>{{ this.hide ? 'Show' : 'Hide' }} panel</b-button
		>
		<div class="panelmain" :class="{ hiddenpanel: this.hide }">
			<section id="clients">
				<b-button variant="primary" v-on:click="addClientToStore"
					>Add client</b-button
				>
				<ul>
					<li
						class="clientslist"
						v-for="(client, index) in clients"
						:key="index"
					>
						{{ client.name }}<br />
						<b-button class="mr-1">Connect</b-button>
						<b-button v-on:click="removeClient(client.id)"
							>Remove</b-button
						>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const clients = namespace('Clients')

import { VuexModule } from 'vuex-module-decorators'
import { Client } from '@/lib/client/Client'

@Component
export default class TestingPanel extends Vue {
	@clients.State
	public clients!: Array<Client>

	@clients.Mutation
	public addClient!: (client: Client) => void
	@clients.Mutation
	public removeClient!: (id: string) => void

	private hide: boolean = false

	public togglePanel(): void {
		this.hide = !this.hide
	}

	public addClientToStore() {
		let cli = new Client()
		let rnd = Date.now().toString()
		cli.name = 'Client#' + rnd
		cli.id = rnd
		cli.ipAddresses.ipv4 = '127.0.0.1'
		cli.ipAddresses.ipv6 = '2001:db8:85a3::8a2e:370:7334'
		cli.firstSeen = Date.now().toString()
		cli.lastSeend = Date.now().toString()
		cli.validExecutionFolders = ['C:/Home/dir', 'A:/Applications/test']
		this.addClient(cli)
	}
}
</script>
<style lang="scss" scoped>
#testingpanel {
	z-index: 999;
	width: 50vw;
	height: 100vh;
	position: absolute;
	right: 0;
}
#hidebutton {
	position: absolute;
	right: 0;
	top: 0;
}
.clientslist {
	padding: 0.5rem 0;
}
.hiddenpanel {
	display: none;
}

.panelmain {
	background: #12131f;
	height: 100%;
	padding: 1rem;
}
</style>
