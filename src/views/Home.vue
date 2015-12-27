<template>
		<toolbar :text="title">
			<span class="glyphicon glyphicon-menu-hamburger" slot="leftBtn" @click="showMenu"></span>
		</toolbar>
		<div class="container-fluid">
			
		</div>
</template>

<script lang="babel">
	import ToolBar from 'src/components/ToolBar.vue'
	export default 	{
		created(){
			console.log("home is created")
		},
		components:{
	    	toolbar:ToolBar
	    },
		data() {
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