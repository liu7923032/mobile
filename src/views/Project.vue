<template>
	<div class="page" >
		<nav-bar text="我的项目">
			<span class="icon-chevron-left" slot="leftBar" v-touch:tap="back"></span>
	        <span class="icon-refresh" slot="rightBar" v-touch:tap="showSheet"></span>
		</nav-bar>
		<page-body>
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
		</page-body>

		<toast :show="showToast"></toast>
		<actionsheet :show.sync="showsheet"  :menus="menuItems" :actions="actionItems" v-on:weui-menu-click="actionClick"></actionsheet>
	</div>
</template>

<script lang="babel">
	import NavBar from '../components/NavBar.vue'
	import List from '../components/List.vue'
	import { Actionsheet } from 'vue-weui'
	import Item from '../components/ListItem.vue'
	import PageBody from '../components/PageBody.vue'
	// import ActionSheet from '../components/ActionSheet.vue'
	import Toast from '../components/Toast.vue'
	export default {
		name:'Project',
		data(){
			return {
				showsheet:false,
				menuItems:{camaer:'拍照',img:'选择图片'},
				actionItems:{text:'取消'},
				showToast:false
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
			NavBar,
			List,
			Actionsheet,
			Toast,
			Item,
			PageBody
		}
	}
</script>


<style scoped>
	
</style>