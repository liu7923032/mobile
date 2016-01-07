<template>
    <div class="user-info">
        <!-- 未登录 -->
        <div class="nologin" v-if="!loginname">
            <span ></span>
            <span  @click="goEnter"><a >登录</a></span>
        </div>
        <!-- 已登录 -->
        <div class="login" v-if="loginname" @click="goUser">
            <div class="avertar">
            	<img v-if="avatar_url" :src="avatar_url">
            </div>
            <div class="info">
                <span v-if="loginname" v-text="loginname"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        replace:true,
        data () {
            return {
                // loginname: localStorage.loginname || "",
                // avatar_url: localStorage.avatar_url || ""
                loginname:"张三",
                avatar_url:''
            }
        },
        methods:{
            goEnter (){
                var link = '/login?redirect='+ encodeURIComponent(this.$route.path);
                this.$route.router.go(link);
            },
            goUser (){
                this.$route.router.go({name:'userinfo',params:{loginname:this.loginname}});
            }
        }
    }
</script>

<style type="text/css" scoped>
    /*侧边栏用户信息区域*/
    .user-info {
        padding: 10px;
        font-size: 15px;
        color: #313131;
    }

	.nologin{
		line-height: 30px;
        padding-left: 10px;
        display: flex;
        display: -webkit-flexbox;
        flex-flow:row nowrap;
        justify-content:space-between;
        margin: 0px 20px;
        align-items:center;
	}

	.nologin>span:first-child{
		width: 24px;
        height: 24px;
        content: '';
        background: url("../assets/images/components/login_icon.png") no-repeat left center;
      	background-size: 24px 24px;
	}



    /*//已登录*/
    .login {
    	line-height: 30px;
        padding-left: 10px;
        display: flex;
        display: -webkit-flexbox;
        flex-flow:row nowrap;
        justify-content:space-between;
        margin: 0px 20px;
        align-items:center;
        cursor: pointer;
    }

 	.login>.avertar {
        width: 40px;
        height: 40px;
        background: url("../assets/images/components/user.png") no-repeat center center;
        background-size: 40px 40px;
        border-radius: 20px;
        overflow: hidden;
    }

	.login>.avertar>img {
        width: 40px;
        height: 40px;
    }

    .login>.info {
        margin-left: 10px;
        overflow: hidden;
    }
    .login>span {
        width: 85px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        line-height: 12px;
        line-height: 40px;
        
    }
    
    .login>span>.lh20 {
        line-height: 20px;
     }
    /*.login-yes:after {
        display: block;
        background: url("../assets/images/components/go_icon.png") no-repeat center right;
        background-size: 7px 7px;
    }*/
</style>