<template>
	<div class="container-fluid">
		<div class="toolbar">
			<span class="glyphicon glyphicon-menu-hamburger" @click="showMenu"></span>
			<p class="text-title">{{title}}</p>
		</div>
		<div class="container-fluid">
			
		</div>
	</div>
</template>

<script lang="babel">

	export default {
		data(){
			return {
				title:'首页'
			}
		},
	    methods: {
	        showMenu() {
	            this.$root.isShow = true;
	        }
	    }
	}
</script>

<style>

	


</style>