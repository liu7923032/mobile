<template>
	<div class="page">
		<nav-bar text="登录页"></nav-bar>
		<div class="page-bd">
			<div class="loginUrl"> 
				<img src="../assets/images/login/login.png" alt="用户">
			</div>
			<div class="weui_cells weui_cells_form">
				<div class="weui_cell">
	                <div class="weui_cell_hd"><label class="weui_label">账号</label></div>
	                <div class="weui_cell_bd weui_cell_primary">
	                    <input class="weui_input" type="text" v-el:account v-model="account"  placeholder="请输入账号">
	                </div>
	            </div>
	            <div class="weui_cell">
	                <div class="weui_cell_hd"><label class="weui_label">密码</label></div>
	                <div class="weui_cell_bd weui_cell_primary">
	                    <input class="weui_input" type="password"  v-model="pwd" placeholder="请输入密码">
	                </div>
	            </div>
			</div>
		
			<div class="weui_cells weui_cells_checkbox">
				<label  class="weui_cell weui_check_label" for="ck_remeber">
					<div class="weui_cell_hd">
						<input type="checkbox" class="weui_check" name="isremeber" id="ck_remeber" >
						<i class="weui_icon_checked"></i>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>是否记忆密码</p>
					</div>
				</label>
			</div>
			<div class="weui_btn_area">
				<a href="javascript:" class="weui_btn weui_btn_primary" @click="login">登录</a>
			</div>
		</div>
	</div>
</template>


<script>
	import NavBar from '../components/NavBar.vue'
	import {Button} from 'vue-weui'
	export default {
		data(){
			return {
				account:'M',
				pwd:''
			}
		},
		ready(){
			this.account="M";
			console.log(this.$els.account)
			this.$els.account.focus();
		},
		components:{
			NavBar
		},
		methods:{
			login(){
				//向服务器发起请登录请求
				alert("你好登陆")
			}
		}
	}
</script>


<style type="text/css" scoped>
	.loginUrl{
		text-align: center;
		margin: 10px 5px;
	}


	.weui_cell_primary>p{
		font-size: 13px;
	}
</style>