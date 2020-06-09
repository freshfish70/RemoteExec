<template>
	<div>
		<router-link to="/app">Login</router-link>
	</div>
</template>
<script>
export default {
	created() {
		this.$router.replace('/app/')
	},
}
</script>
