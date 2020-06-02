<template>
	<div id="app">
		<dbg></dbg>
		<router-view />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TestingPanel from '@/components/TestingPanel.vue'
@Component({
	components: {
		dbg: TestingPanel,
	},
})
export default class App extends Vue {}
</script>
