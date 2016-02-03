<template>
	<div class="page-bd" v-on:scroll.prevent="scroll($event)">
		<slot></slot>	
	</div>
</template>

<script>
	export default {
		methods:{
			scroll(e){
				this.$broadcast("scroll",e);
			}
		}
	}
</script>

<style>
	
</style>