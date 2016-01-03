<template>
	<ul class="tabs-nav">
			<li v-for="(index,item) in tabItems" 
			:class="{'nav_active':activieIndex===index}" 
			@click="switchTab(index)" 
			transition="nav_swtchtranstion" >{{item.title}}</li>
	</ul>
	<div class="tabs_content">
		<div v-for="(index,item) in tabItems" v-show="activieIndex===index">{{
				item.content
			}}</div>
	</div>
</template>

<script lang="babel">
	
	export default {
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
		methods:{
			//点击tabs
			switchTab(index){
				this.activieIndex=index;
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
			border-bottom: 2px solid darkorange;
		}

		.nav-tabs .nav_link {
			color: black;
		}
		
		

</style>