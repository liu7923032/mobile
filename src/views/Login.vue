<template>
	<div class="page login">
		<nav-bar text="登录页"></nav-bar>
		<div class="page-bd">
			<div class="loginUrl"> 
				<img src="../assets/images/login/login.png" alt="用户">
			</div>
			
			<cells type="form">
				<input-cell label="账号" placeholder="工号：M0XXX" :value.sync="account" v-ref:account></input-cell>
				<input-cell label="密码" placeholder="密码" type="password" :value.sync="pwd" ></input-cell>
			</cells>
			
			<cells type="checkbox">
				<checkbox-cell name="isremeber" :checked.sync="isremeber" label="<p>是否记忆密码</p>" ></checkbox-cell>
			</cells>
			
			<cells>
			<button-area>
				<button @click="login">登录</button>
			</button-area>
		</div>
		<dialog v-show="isPrompt" title="错误提示" @weui-dialog-confirm="confirmDlg">
			<p>{{errorMsg}}</p>
		</dialog>
		<toast v-show="isloading" type="loading">
			登录中..
		</toast>
	</div>
</template>


<script>
	import NavBar from '../components/NavBar.vue'
	import auth from './utils/auth.js'
	import {ButtonArea,Button,Cells,Cell,CheckboxCell,InputCell,Dialog,Toast} from 'vue-weui'
	export default {
		data(){
			return {
				account:'M0679',
				pwd:'000',
				isremeber:true,
				isPrompt:false,
				isloading:false,
				errorMsg:'错误了',
				device:'',
				redirectUrl:''
			}
		},
		ready(){
			// this.account="M";
			// console.log(this.$refs.account)
			// this.$els.account.focus();
		},
		components:{
			NavBar,
			ButtonArea,
			Button,
			CheckboxCell,
			Cells,
			Cell,
			Dialog,
			Toast,
			InputCell
		},
		
		methods:{
			confirmDlg(){
				this.isPrompt=false;
			},
			showDialog(errorMsg){
				this.errorMsg=errorMsg;
				this.isPrompt=true;
			},
			login(){
				//向服务器发起请登录请求
				if(this.account.length!=5){
					// this.errorMsg="账号必须是五位";
					// this.isPrompt=true;
					this.showDialog("账号必须是五位");
					return;
				}
				if(this.pwd.length<3){
					// this.errorMsg="密码最小长度是三位:"+this.getVersion().android;
					this.showDialog("密码最小长度是三位");
					return;
				}

				//向服务器发起请求
				this.isloading=true;
				this.$http.get("auth",{"account":this.account,"passwd":this.pwd,"device":this.device}).then((response)=>{
					this.isloading=false;
					var data=response.data;
					console.log(data);
					if(data.Statu=="Y"){
						auth.setUser(this.account,this.password,this.isremeber);
						//跳转到首页
						// console.log("我的测试:"+this.$route);
						if(this.redirectUrl&&this.redirectUrl.length>0){
							this.$route.router.go(this.redirectUrl);
						}
						else{
							this.$route.router.go("index");
						}
					}else{
						this.showDialog(data.Msg);
					}
					
				},(error)=>{
					this.isloading=false;
				});
				console.log("账号:"+this.account+"-密码是:"+this.pwd+"-记住密码:"+this.isremeber)
			},
			getVersion(){
           		 let u = navigator.userAgent,
                app = navigator.appVersion;
	            return { //移动终端浏览器版本信息
	                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	                iPad: u.indexOf('iPad') > -1, //是否iPad
	            };
			}
		},
		ready(){
			// var tmpDevice=""
			// if(this.getVersion().ios){
			// 	this.device="ios";
			// }else if(this.getVersion().android){
			// 	this.device= "android";
			// }else if(this.getVersion().iPhone){
			// 	this.device= "iPhone";
			// }else if(this.getVersion().iPad){
			// 	this.device="iPad";
			// }else{
			// 	this.device="web";
			// }
			

			//得到重定向的url
			this.redirectUrl= decodeURIComponent(this.$route.query.redirect || '/');
			console.log("原来的路径："+this.redirectUrl);

		}
	}
</script>


<style type="text/css" >
	.login .loginUrl{
		text-align: center;
		margin: 10px 5px;
	}


	.login p{
		font-size: 13px;
	}
</style>