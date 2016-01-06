<template>
	<div class="container-fluid">
		<ul class="nav-tabs">
				<li v-for="(index,item) in tabItems"
				:class="{'nav_active':selectIndex===index}" 
				@click="switchTab(index)" 
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
		},
		props:{
			tabItems:{
				type:Array,
				default:[]
			},
			activeIndex:{
				type:Number,
				default:0
			},
			underline:{
				type:Number,
				default:100
			}
		},
		data(){
			return {
				//当前选中的tab页面
				selectIndex:0
			}
		},
		methods:{
			//点击tabs
			switchTab(index){
				this.selectIndex=index;
				var leftWidth=index*this.underline;
				document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+leftWidth+"px)";
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
			border-bottom: 1px solid whitesmoke;
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
			width: 300px;
			margin-top: -3px;
			background-color: darkorange;
			transition: all .3s ease;
			width: 0px;
		}
</style>