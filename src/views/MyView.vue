<template>
	<div class="container-fluid">
		<div class="toolbar">
			<span class="glyphicon glyphicon-arrow-left" @click="back"></span>
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
				title:'我的地盘'
			}
		},
	    methods: {
	        back() {
	           history.back()
            }
	    },
	    route:{
	    	activate(){
	    		this.$root.isShow=false;
	    	}
	    }
	}
</script>
