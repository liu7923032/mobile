<template>
     <div class="toolbar">
        <slot name="leftBtn"></slot>
        <p class="text-title">{{text}}</p>
        <slot name="rightBtn"></slot>
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
				default:"未知列表"
			}
		},
		data(){
			return {

			}
		}
	}
</script>

<style>
    
    .toolbar {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            background-color: whitesmoke;
            height: 44px;
            flex-flow: row nowrap;
            justify-content: space-between;
            position: absolute;
            left: 0px;
            top: 0px;
            align-items: center;
            align-content: space-between;
            
        }
    .toolbar p{
        font-size: 16px;
        font-weight: bold;
        
    }
    .toolbar span{
        font-size: 24px;
        margin:0px 5px;
        color: whitesmoke;
    }
</style>