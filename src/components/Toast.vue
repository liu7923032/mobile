<template>
	<section class="toast" v-show="show">
		<section class="toast-mask"></section>
		<section class="toast-bd">
			<section class="loading" v-if="isload">
				<div class="loading_leaf loading_leaf_0"></div>
				<div class="loading_leaf loading_leaf_1"></div>
				<div class="loading_leaf loading_leaf_2"></div>
				<div class="loading_leaf loading_leaf_3"></div>
				<div class="loading_leaf loading_leaf_4"></div>
				<div class="loading_leaf loading_leaf_5"></div>
				<div class="loading_leaf loading_leaf_6"></div>
				<div class="loading_leaf loading_leaf_7"></div>
				<div class="loading_leaf loading_leaf_8"></div>
				<div class="loading_leaf loading_leaf_9"></div>
				<div class="loading_leaf loading_leaf_10"></div>
				<div class="loading_leaf loading_leaf_11"></div>
			</section>
			<section class="prompt" v-else>
				<i class="weui_icon_toast"></i>
			</section>
			<p class="toast-content" >{{prompt}}</p>
		</section>
	</section>
</template>

<script lang="babel">
	
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			//显示的时常
			seconds:{
				type:Number,
				default:5
			},
			isload:{
				type:Boolean,
				default:false
			},
			prompt:{
				type:String,
				default:'已经完成'
			}
		},
		data(){
			return {
				sec:0
			}
		},
		ready(){
			if(!this.isload){
				setTimeout(()=>{
					this.show=false;
				},this.seconds*1000);
			}
		},
		created(){
			if(this.isload){
				this.prompt="正在加载中..";
			}
		}
	}

</script>


<style type="text/css" scoped> 
	
	.toast{
		position: fixed;
	    z-index: 3;
	    width: 7.6em;
	    min-height: 7.6em;
	    top: 180px;
	    left: 50%;
	    margin-left: -3.8em;
	    background: rgba(40, 40, 40, 0.75);
	    text-align: center;
	    border-radius: 5px;
	    color: #FFFFFF;
	}

	/*遮罩*/
	.toast-mask{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		height: 100%;
		width: 100%;
	}

	.toast-bd>.loading{
		position: absolute;
	    width: 0px;
	    z-index: 20;
	    left: 50%;
	    top: 38%;
	}

	.toast-content{
		margin: 0 0 15px;
		margin-top:10px;
      	font-size:14px;
	}

	.loading_leaf{
		position: absolute;
	    top: -1px;
	    opacity: 0.25;
	}

	.loading_leaf:before{
		content:" ";
        position: absolute;
        width: 8.14px;
        height: 3.08px;
        background: rgb(209, 209, 213);
        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
        border-radius: 1px;
        transform-origin: left 50% 0px;
	}

	.loading_leaf_0{
		animation: opacity-60-25-0-12 1.25s linear infinite;
	}
	.loading_leaf_0:before{
		transform: rotate(0deg) translate(7.92px, 0px);
	}

	.loading_leaf_1{
		animation: opacity-60-25-1-12 1.25s linear infinite;
	}
	.loading_leaf_1:before{
		transform: rotate(30deg) translate(7.92px, 0px);
	}


	.loading_leaf_2{
		animation: opacity-60-25-2-12 1.25s linear infinite;
	}
	.loading_leaf_2:before{
		transform: rotate(60deg) translate(7.92px, 0px);
	}


	.loading_leaf_3{
		animation: opacity-60-25-3-12 1.25s linear infinite;
	}
	.loading_leaf_3:before{
		transform: rotate(90deg) translate(7.92px, 0px);
	}

	.loading_leaf_4{
		animation: opacity-60-25-4-12 1.25s linear infinite;
	}
	.loading_leaf_4:before{
		transform: rotate(120deg) translate(7.92px, 0px);
	}

	.loading_leaf_5{
		animation: opacity-60-25-5-12 1.25s linear infinite;
	}
	.loading_leaf_5:before{
		transform: rotate(150deg) translate(7.92px, 0px);
	}

	.loading_leaf_6{
		animation: opacity-60-25-6-12 1.25s linear infinite;
	}
	.loading_leaf_6:before{
		transform: rotate(180deg) translate(7.92px, 0px);
	}

	.loading_leaf_7{
		animation: opacity-60-25-7-12 1.25s linear infinite;
	}
	.loading_leaf_7:before{
		transform: rotate(210deg) translate(7.92px, 0px);
	}

	.loading_leaf_8{
		animation: opacity-60-25-8-12 1.25s linear infinite;
	}
	.loading_leaf_8:before{
		transform: rotate(240deg) translate(7.92px, 0px);
	}

	.loading_leaf_9{
		animation: opacity-60-25-9-12 1.25s linear infinite;
	}
	.loading_leaf_9:before{
		transform: rotate(270deg) translate(7.92px, 0px);
	}

	.loading_leaf_10{
		animation: opacity-60-25-10-12 1.25s linear infinite;
	}
	.loading_leaf_10:before{
		transform: rotate(300deg) translate(7.92px, 0px);
	}

	.loading_leaf_11{
		animation: opacity-60-25-11-12 1.25s linear infinite;
	}
	.loading_leaf_11:before{
		transform: rotate(330deg) translate(7.92px, 0px);
	}

	.loading_leaf_12{
		animation: opacity-60-25-12-12 1.25s linear infinite;
	}
	.loading_leaf_12:before{
		transform: rotate(360deg) translate(7.92px, 0px);
	}


	@-webkit-keyframes opacity-60-25-0-12 {
	  0% { opacity: 0.25; }
	  0.01% { opacity: 0.25; }
	  0.02% { opacity: 1; }
	  60.01% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-1-12 {
	  0% { opacity: 0.25; }
	  8.34333% { opacity: 0.25; }
	  8.35333% { opacity: 1; }
	  68.3433% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-2-12 {
	  0% { opacity: 0.25; }
	  16.6767% { opacity: 0.25; }
	  16.6867% { opacity: 1; }
	  76.6767% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-3-12 {
	  0% { opacity: 0.25; }
	  25.01% { opacity: 0.25; }
	  25.02% { opacity: 1; }
	  85.01% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-4-12 {
	  0% { opacity: 0.25; }
	  33.3433% { opacity: 0.25; }
	  33.3533% { opacity: 1; }
	  93.3433% { opacity: 0.25; }
	  100% { opacity: 0.25; }
	}@-webkit-keyframes opacity-60-25-5-12 {
	  0% { opacity: 0.270958333333333; }
	  41.6767% { opacity: 0.25; }
	  41.6867% { opacity: 1; }
	  1.67667% { opacity: 0.25; }
	  100% { opacity: 0.270958333333333; }
	}@-webkit-keyframes opacity-60-25-6-12 {
	  0% { opacity: 0.375125; }
	  50.01% { opacity: 0.25; }
	  50.02% { opacity: 1; }
	  10.01% { opacity: 0.25; }
	  100% { opacity: 0.375125; }
	}@-webkit-keyframes opacity-60-25-7-12 {
	  0% { opacity: 0.479291666666667; }
	  58.3433% { opacity: 0.25; }
	  58.3533% { opacity: 1; }
	  18.3433% { opacity: 0.25; }
	  100% { opacity: 0.479291666666667; }
	}@-webkit-keyframes opacity-60-25-8-12 {
	  0% { opacity: 0.583458333333333; }
	  66.6767% { opacity: 0.25; }
	  66.6867% { opacity: 1; }
	  26.6767% { opacity: 0.25; }
	  100% { opacity: 0.583458333333333; }
	}@-webkit-keyframes opacity-60-25-9-12 {
	  0% { opacity: 0.687625; }
	  75.01% { opacity: 0.25; }
	  75.02% { opacity: 1; }
	  35.01% { opacity: 0.25; }
	  100% { opacity: 0.687625; }
	}@-webkit-keyframes opacity-60-25-10-12 {
	  0% { opacity: 0.791791666666667; }
	  83.3433% { opacity: 0.25; }
	  83.3533% { opacity: 1; }
	  43.3433% { opacity: 0.25; }
	  100% { opacity: 0.791791666666667; }
	}@-webkit-keyframes opacity-60-25-11-12 {
	  0% { opacity: 0.895958333333333; }
	  91.6767% { opacity: 0.25; }
	  91.6867% { opacity: 1; }
	  51.6767% { opacity: 0.25; }
	  100% { opacity: 0.895958333333333; }
	}

</style>


