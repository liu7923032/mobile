<template>
	<div class="page userinfo">
		<nav-bar text="个人主页">
			<span class="icon-chevron-left" slot="leftBar" @click="back">返回</span>
			<span class="icon-refresh" slot="rightBtn" @click="loadUserInfo"></span>
		</nav-bar>
		<page-body>
			<div class="cell">
				
			</div>
			<cells-title>
				个人基本信息
			</cells-title>
			<cells >
				<cell>
					<div slot="body">姓名</div>
					<div slot="footer">刘克志</div>
				</cell>
				<cell>
					<div slot="body">部门<span></span></div>
					<div slot="footer">信息管理中心</div>
				</cell>
				<cell>
					<div slot="body">岗位:<span></span></div>
					<div slot="footer">工程师</div>
				</cell>
				<cell>
					<div slot="body">年假结余:<span></span></div>
					<div slot="footer">3天</div>
				</cell>
				<cell>
					<div slot="body">福利假:<span></span></div>
					<div slot="footer">1天</div>
				</cell>
				<cell>
					<div slot="body">探亲假:<span></span></div>
					<div slot="footer">1天</div>
				</cell>
			</cells>
		</page-body>
	</div>

</template>


<script lang="babel">
	
	import NavBar from '../components/NavBar.vue'
	import PageBody from '../components/PageBody.vue'
	import {Cells,Cell,CellsTitle} from 'vue-weui'
	
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
			test(e){
				console.log('11');
			},
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
				dialogTitle:'测试',
				isAlert:true
			}
		},
		components:{
			NavBar,
			PageBody,
			Cells,
			Cell,
			CellsTitle
		}

	}


</script>

<style type="text/css" scoped>
	
</style>