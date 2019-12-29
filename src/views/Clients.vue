<template>
	<div id="page-content">
		<section id="content-top"></section>
		<section id="content" class="">
			<div class="client-group">
				<b-card
					class="drop-shadow"
					img-top
					style="max-width: 25rem; min-width: 22rem;"
				>
					<div class="connection-state connected"></div>
					<b-card-title>Client</b-card-title>
					<b-card-text>
						192.168.1.125<br />
						2001:db8:85a3:0:0:8a2e:370:7334
					</b-card-text>
				</b-card>
				<b-card
					class="drop-shadow"
					img-top
					style="max-width: 25rem; min-width: 22rem;"
				>
					<div class="connection-state disconnected"></div>
					<b-card-title>Client</b-card-title>
					<b-card-text>
						192.168.1.125<br />
						2001:db8:85a3:0:0:8a2e:370:7334
					</b-card-text>
				</b-card>
				<b-card
					class="drop-shadow"
					img-top
					style="max-width: 25rem; min-width: 22rem;"
				>
					<div class="connection-state disconnected"></div>
					<b-card-title>Client</b-card-title>
					<b-card-text>
						192.168.1.125<br />
						2001:db8:85a3:0:0:8a2e:370:7334
					</b-card-text>
				</b-card>
				<b-card
					class="drop-shadow"
					img-top
					style="max-width: 25rem; min-width: 22rem;"
				>
					<div class="connection-state disconnected"></div>
					<b-card-title>Client</b-card-title>
					<b-card-text>
						192.168.1.125<br />
						2001:db8:85a3:0:0:8a2e:370:7334
					</b-card-text>
				</b-card>
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
export default class Clients extends Vue {}
</script>
<style lang="scss"></style>
