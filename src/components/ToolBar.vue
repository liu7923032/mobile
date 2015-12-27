<template>
	<div class="toolbar">
		<slot name="leftBtn"></slot>
		<p class="text-title">aaa</p>
	</div>
</template>

<script lang="babel">
	export default {
		created(){
			console.log("toolbar is created");
		},
		props:{
			text:{
				type:String,
				default:""
			}
		},
		data(){
			return {

			}
		}
	}
</script>

<style>
    .text-title {
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        color: whitesmoke;
    }
    
    .toolbar {
        height: 48px;
        width: 100%;
        background-color: #3D82C4;
        padding: 10px;
        
    }
    
    .toolbar span{
    	font-size: 28px;
    	margin-left: 5px;
    	color: whitesmoke;
    	float: left;
    }
</style>