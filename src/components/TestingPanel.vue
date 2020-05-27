<template>
	<div id="testingpanel" :class="{ flat: this.hide }">
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
						<b-button
							class="mr-1"
							v-on:click="
								setConnectedState({
									clientId: client.id,
									connected: !client.connected,
								})
							"
							>{{
								client.connected ? 'Disconnect' : 'Connect'
							}}</b-button
						>
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
import { VuexModule } from 'vuex-module-decorators'
import { Client } from '@/lib/client/Client'
import { ExecuteableApplication } from '../lib/Execution/ExecuteableApplication'
import { ClientGroupExecution } from '../lib/Execution/ClientGroupExecution'
import { Executable } from '../lib/Execution/Executable'
import { ClientProcessState } from '../types/Execution/ClientProcessState'
import Clients from '@/store/modules/Clients'

@Component
export default class TestingPanel extends Vue {
	get clients() {
		return Clients.clients
	}

	private updateClientProcessState(newState: ClientProcessState) {
		Clients.updateClientProcessState(newState)
	}

	private removeClient(clientId: string) {
		Clients.removeClient(clientId)
	}

	private setConnectedState(state: { clientId: string; connected: boolean }) {
		Clients.setConnectedState(state)
	}

	private hide: boolean = true

	public togglePanel(): void {
		this.hide = !this.hide
	}

	created() {
		this.addClientToStore()
	}

	public addClientToStore() {
		let cli = new Client()
		let rnd = Date.now().toString()
		cli.name = 'Client#' + rnd
		cli.id = rnd
		cli.ipAddresses.ipv4 = '127.0.0.1'
		cli.ipAddresses.ipv6 = '2001:db8:85a3::8a2e:370:7334'
		cli.firstSeen = Date.now().toString()
		cli.lastSeen = Date.now().toString()
		cli.executions.push(
			new ExecuteableApplication(
				'22',
				'A not so super process',
				'But this process has a description',
				'test.exe',
				'C:/Home/dir',
				'-e -a'
			),
			new ExecuteableApplication(
				'33',
				'SomeSuperProcess',
				'A process that is super',
				'builder.exe',
				'A:/Applications/test',
				'-runWithSomeArgs 5'
			)
		)
		let grp = new ClientGroupExecution('Simulator', 'Boat simulator')
		grp.addExecutable(new Executable(cli.executions[0], 3600))
		grp.addExecutable(new Executable(cli.executions[1], 3600))
		cli.addGroupExecution(grp)
		cli.validExecutionFolders = ['C:/Home/dir', 'A:/Applications/test']
		Clients.addClient(cli)

		setInterval(() => {
			this.updateClientProcessState({
				clientId: cli.id,
				eid: cli.executions[0].eid,
				state: Math.random() < 0.5 ? 1 : 0,
			})
		}, 2500)
	}
}
</script>
<style lang="scss" scoped>
#testingpanel {
	z-index: 50;
	width: 50vw;
	height: 100vh;
	position: absolute;
	right: 0;
}
#hidebutton {
	z-index: 50;
	position: absolute;
	right: 0;
	top: 0;
}
.clientslist {
	padding: 0.5rem 0;
}
.flat {
	width: 1px !important;
}

.hiddenpanel {
	display: none;
	width: 1px;
}

.panelmain {
	background: #12131f;
	height: 100%;
	padding: 1rem;
}
</style>
