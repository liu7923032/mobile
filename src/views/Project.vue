<template>
	<div class="page">
		<toolbar text="我的项目">
			<span class="icon-chevron-left" slot="leftBtn" @click="back"></span>
	        <span class="icon-refresh" slot="rightBtn" ></span>
		</toolbar>
		<div class="page-content" >
			<pull-list >
				<ul>
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