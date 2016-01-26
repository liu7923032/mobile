<!-- 下拉刷新组件 -->

<template>
	<div id="pulllist" v-touch:pandown="pullToRefresh" v-touch:panend="panleave"  >
		<div id="pull-header">
			<span>下拉刷新</span>
		</div>
		<slot></slot>
		<div class="pull-footer">
			
		</div>
	</div>
	
</template>

<script lang="babel">
	export default {
		
		methods:{

			panleave(e){
				var header=	document.getElementById('pulllist');
				header.style.transform="translateY(0px)";
			},
			// 下拉刷新事件
			pullToRefresh(e){
				 if(!e.isFinal){
				 		var header=	document.getElementById('pulllist');
					 	var distance=e.distance;
					 	console.log("拉动的距离"+distance)
					 	if(distance<50){
 							header.style.transform="translateY("+distance+"px)";
					 	}
					 	else{
					 		//1：触发刷新事件
					 		this.$dispatch('list-reload');
					 		header.style.transform="translateY(50px)";
					 	}

				 }else{
				 	 var header=document.getElementById('pulllist');
					 header.style.transform="translateY(0px)";
				 }

			}
		}
	}
</script>


<style >

	#pull-header{
		height: 44px;
		margin-top: -44px;
		transition: all .3s ease;
		display: flex;
		justify-content:center;
	}
	

</style>