<template>
	<toolbar text="个人主页">
		<span class="icon-chevron-left" slot="leftBtn" @click="back">返回</span>
		<span class="icon-refresh" slot="rightBtn" @click="loadUserInfo"></span>
	</toolbar>
	<div>
		
	</div>

	<loading :loading="isload"></loading>
</template>


<script lang="babel">
	
	import ToolBar from '../components/ToolBar.vue'
	import Loading from '../components/Loading.vue'
	export default {
		created(){
			//加载远程数据
			//1:显示加载动画
			setTimeout(()=>{
				this.isload=false;
			}, 2000 );
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
				}, 2000 );
			}
		},
		data(){
			return {
				isload:true
			}
		},
		components:{
			toolbar:ToolBar,
			loading:Loading
		}

	}


</script>

<style type="text/css">
	
</style>