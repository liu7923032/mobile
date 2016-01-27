<template>
	<div class="page">
		<toolbar text="我的项目">
			<span class="icon-chevron-left" slot="leftBtn" v-touch:tap="back"></span>
	        <span class="icon-refresh" slot="rightBtn" ></span>
		</toolbar>
		<div class="page-content" >
			<pull-list v-on:reload="getInitData" v-on:loadmore="getMoreData">
				<ul >
					<li>asdffdddd;</li>
					<li>asdfffffffffffffffffffffffffffffff;a</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;a</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;a</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;a</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>顶顶顶 阿斯蒂芬;</li>

					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>顶顶顶 阿斯蒂芬;</li>

					<li>顶顶顶 阿斯蒂芬;</li>

					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff</li>
					<li>asdfffffffffffffffffffffffffffffff;</li>
					<li>顶顶顶 阿斯蒂芬;</li>
				</ul>
			</pull-list>
		</div>
	</div>
	
</template>

<script lang="babel">
	import ToolBar from '../components/ToolBar.vue'
	import PullList from '../components/PullList.vue'
	export default {

		methods:{
			back(){
				history.back();
			},
			getInitData(){
				alert('集合刷新');
			},
			getMoreData(){
				alert("集合加载更多")
			}
		},
		components:{
			toolbar:ToolBar,
			PullList
		}
	}
</script>


<style scoped>
	
</style>