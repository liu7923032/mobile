<template>
     <div class="toolbar">
        <slot name="leftBtn"></slot>
        <div class="text-title item">{{text}}</div>
        <slot name="rightBtn"></slot>
    </div>
</template>

<script lang="babel">
	export default {
		created(){
			// console.log("toolbar is created");
		},
		props:{
			text:{
				type:String,
				default:"未知列表"
			}
		}
	}
</script>

<style type="text/css">
    
    .toolbar {
        display: flex;
        display: -webkit-flex;
        width: 100%;
        background-color: whitesmoke;
        height: 44px;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }

   
    .toolbar div{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
        
    }
    .toolbar span{
        font-size: 24px;
        margin:0px 10px;
        color: black;
    }
    
    .toolbar span:active{
        color:darkorange;
    }
</style>