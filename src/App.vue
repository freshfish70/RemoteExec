<template>
	<div id="app">
		<router-view />
		<router-link to="/app">HOME</router-link>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>
