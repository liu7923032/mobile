<template>
	<div class="page">
		<toolbar text="我的项目">
			<span class="icon-chevron-left" slot="leftBtn" v-touch:tap="back"></span>
	        <span class="icon-refresh" slot="rightBtn" v-touch:tap="showSheet"></span>
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
	
	<toast :show="showToast"></toast>
	<action-sheet :showsheet.sync="showsheet"  :btn-items="btnItems" v-on:action-click="actionClick"></action-sheet>
</template>

<script lang="babel">
	import ToolBar from '../components/ToolBar.vue'
	import PullList from '../components/PullList.vue'
	import ActionSheet from '../components/ActionSheet.vue'
	import Toast from '../components/Toast.vue'
	export default {
		data(){
			return {
				showsheet:false,
				btnItems:['手机拍照','选择照片'],
				showToast:true
			}
		},
		methods:{
			back(){
				history.back();
			},
			showSheet(){
				this.showsheet=!this.showsheet;
			},
			actionClick(index){
				alert(index);
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
			PullList,
			ActionSheet,
			Toast
		}
	}
</script>


<style scoped>
	
</style>