<template>
	<toolbar text="个人主页">
		<span class="icon-chevron-left" slot="leftBtn" @click="back">返回</span>
		<span class="icon-refresh" slot="rightBtn" @click="loadUserInfo"></span>
	</toolbar>
	<section >
		<input type="button" @click="showDialog">
		<datepicker></datepicker>
	</section>

	<loading :loading="isload"></loading>
	<dialog :show.sync="isShowDialog" :title="dialogTitle" v-on:child-confirm="confirm">
		<div slot="dlg-body">hahah</div>
	</dialog>
</template>


<script lang="babel">
	
	import ToolBar from '../components/ToolBar.vue'
	import Loading from '../components/Loading.vue'
	import Dialog from '../components/Dialog.vue'
	import DatePicker from '../components/DatePicker.vue'
	export default {
		created(){
			//加载远程数据
			//1:显示加载动画
			setTimeout(()=>{
				this.isload=false;
			}, 1000 );
		},
		props:{

		},
		methods:{
			back(){
				history.back();
			},
			//加载用户信息
			loadUserInfo(){
				this.isload=true;
				setTimeout(()=>{
					this.isload=false;
				}, 1000 );
			},
			showDialog(){
					this.isShowDialog=!this.isShowDialog;
			},
			confirm(){
				alert("子组件触发了事件")
			}
		},
		data(){
			return {
				isload:true,
				isShowDialog:false,
				dialogTitle:'测试'
			}
		},
		components:{
			toolbar:ToolBar,
			loading:Loading,
			dialog:Dialog,
			datepicker:DatePicker
		}

	}


</script>

<style type="text/css">
	
</style>