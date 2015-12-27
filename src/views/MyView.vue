<template>

		<toolbar :text="title">
			<span class="glyphicon glyphicon-arrow-left" @click="back" slot="leftBtn"></span>
		</toolbar>
		<div class="container-fluid">
			
		</div>
</template>

<script lang="babel">
import ToolBar from 'src/components/ToolBar.vue'
	export default {
		data(){
			return {
				title:'我的地盘'
			}
		},
		components:{
			toolbar:ToolBar
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
