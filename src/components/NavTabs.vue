<template>
	<ul class="nav-tabs">
			<li v-for="(index,item) in tabItems" 
			:class="{'nav_active':activieIndex===index}" 
			@click="switchTab(index)" 
			transition="nav_swtchtranstion" >{{item.title}}</li>
	</ul>
	<div class="tabs_line"></div>
	<div class="tabs_content">
		<div v-for="(index,item) in tabItems" v-show="activieIndex===index">{{
				item.content
			}}</div>
	</div>
</template>

<script lang="babel">
	
	export default {
		created(){
			var docWidth=document.body.offsetWidth;
			this.lineWidth=docWidth/this.tabItems.length;
			document.querySelectorAll('.tabs_line')[0].style.width=lineWidth+"px";
		},
		props:{
			tabsItem:{
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
				lineWidth:0;
			}
		},
		methods:{
			//点击tabs
			switchTab(index){
				this.activieIndex=index;
				var leftWidth=index*lineWidth;
				document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+leftWidth+"px)";
			}
		}
	}
</script>

<style type="text/css">

		.nav-tabs {
			margin: 0px;
			padding: 0px;
			display: flex;
			display: -webkit-flex;
			flex-flow: row nowrap;
			list-style-type: none;
			line-height: 30px;
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
		
		.nav-tabs .nav_active {
			color: darkorange;
		}

		.nav-tabs .nav_link {
			color: black;
		}
		
		

		.tabs_line {
			display: flex;
			height: 3px;
			width: 300px;
			margin-top: -3px;
			background-color: darkorange;
			transition: transform 0.4s;
			width: 0px;
		}
</style>