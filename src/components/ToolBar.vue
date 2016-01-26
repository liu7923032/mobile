<template>
     <header class="toolbar" >
        <slot name="leftBtn" ></slot>
        <div class="text-title item">{{text}}</div>
        <slot name="rightBtn" ></slot>
    </header>
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

<style type="text/css" >
    
    .toolbar {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        background-color: rgba(255, 255, 255, 255);
        height: 44px;
        min-height: 44px;
        -webkit-flex-flow: row nowrap;
        -ms-flex-flow: row nowrap;
                flex-flow: row nowrap;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
                justify-content: space-between;
        -webkit-align-items: center;
        -ms-flex-align: center;
                align-items: center;
        border-bottom: 2px solid lightgray;
        /*box-shadow:0 0 4px rgba(0, 0, 0, 0.25);*/
        width: 100%;
    }

    .toolbar div{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
    }

    .toolbar>span{
        position: relative;
        font-size: 20px;
        color: #595959;
        cursor: pointer;
    }

    span[slot="leftBtn"]{
        margin-left: 10px;
    }

    span[slot="rightBtn"]{
       margin-right: 10px;
    }
   
    
    .toolbar span:active{
        color:darkorange;
    }
</style>