<template>
	<div class="page">
		<tool-bar text="我的项目">
			<span class="icon-chevron-left" slot="leftBtn" v-touch:tap="back"></span>
	        <span class="icon-refresh" slot="rightBtn" v-touch:tap="showSheet"></span>
		</tool-bar>
		<div class="page-content" >
			<list v-on:reload="getInitData" v-on:loadmore="getMoreData">
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
			</list>
		</div>
	</div>
	
	<toast :show="showToast"></toast>
	<action-sheet :showsheet.sync="showsheet"  :btn-items="btnItems" v-on:action-click="actionClick"></action-sheet>
</template>

<script lang="babel">
	import ToolBar from '../components/ToolBar.vue'
	import List from '../components/List.vue'
	import Item from '../components/ListItem.vue'
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
			ToolBar,
			List,
			ActionSheet,
			Toast,
			Item
		}
	}
</script>


<style scoped>
	
</style>