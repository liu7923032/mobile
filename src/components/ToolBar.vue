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
        background-color: rgba(255, 255, 255, 0.95);
        height: 44px;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        box-shadow:0 0 4px rgba(0, 0, 0, 0.25);
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
        color: #595959;
        cursor: pointer;
    }
    
    .toolbar span:active{
        color:darkorange;
    }
</style>