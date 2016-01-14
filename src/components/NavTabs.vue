<template>
	<div class="container-fluid" v-touch:swipe="swipeTab">
		<ul class="nav-tabs">
				<li v-for="(index,item) in tabItems"
				:class="{'nav_active':selectIndex===index}" 
				v-touch:tap="switchTab(index)" 
				 >{{item.title}}</li>
		</ul>
		<div class="tabs_line" v-bind:style="{ width:underline+ 'px' }"></div>
		<div class="tabs_content">
			<div v-for="(index,item) in tabItems" v-show="selectIndex===index">
				{{ item.content }}
			</div>
		</div>
	</div>
</template>

<script lang="babel">
	
	export default {
		created(){
			this.selectIndex=this.activeIndex;
			var width=	document.body.offsetWidth-20;
		    this.underline=width/this.tabItems.length;
		},
		props:{
			tabItems:{
				type:Array,
				default:[]
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				//当前选中的tab页面
				selectIndex:0,
				underline:100
			}
		},
		methods:{
			//点击tabs
			switchTab(index){
				this.selectIndex=index;
				var leftWidth=index*this.underline;
				document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+leftWidth+"px)";
			},
			swipeTab(e){
				var deltaX=e.deltaX;
				var tempIndex=this.activeIndex;
				if(deltaX<0){
					var tempIndex=this.activeIndex-1;
					if(tempIndex<0){
						tempIndex=0;
					}
				}else{
					var tabLength=this.tabItems.length-1;
					if(tempIndex==tabLength){
						tempIndex=tabLength;
					}else{
						tempIndex=this.activeIndex+1;
					}
				}
				this.activeIndex=tempIndex;
				this.switchTab(tempIndex);
				// document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+deltaX+"px)";
			}
		}
	}
</script>

<style type="text/css" scoped>
		
		.nav-tabs {
			margin: 0px;
			padding: 0px;
			display: flex;
			display: -webkit-flex;
			flex-flow: row nowrap;
			list-style-type: none;
			line-height: 35px;
			border-bottom: 2px solid whitesmoke;
			padding: 0 10px;
			align-items: center;
			align-content: center;
			justify-content: space-around;
			font-size: 14px;
			font-weight: bold;
			flex-grow: 1;
		}
		
		
		.nav-tabs>li {
			width: 100%;
			text-align: center;
			vertical-align: middle;
			cursor: pointer;
		}
		
		.nav_active {
			color: darkorange;
		}

		
		.tabs_line {
			display: flex;
			height: 3px;
			margin: 0px 10px;
			margin-top: -3px;
			background-color: darkorange;
			transition: all .3s ease;
			width: 0px;
		}
</style>