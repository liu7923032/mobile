<template>
	<div class="page-cover" v-if="showMenu" @click="showCover">
	</div>

	 <section id="sideBar" class="nav-list" :class="{'showside':showMenu}" >
	    <userheader></userheader>
        <ul class="list-ul">
        	<li v-for="item in menuItems"  :class="item.icon" v-link="{'name':item.link}" >{{item.text}}</li>
        </ul>
        <ul class="loginout">
        	<li   class="icon-comments" v-link="{'name':comment}" >问题反馈</li>
        	<li   class="icon-off" @click="loginOut">退出系统</li>
        </ul>
    </section>
</template>

<script type="text/javascript">

	import UserHeader from './UserHeader.vue';
	import EventListener from './utils/EventListener.js'
	export default {
		created(){
			console.log("进入sidebar");

		},
		replace:true,
		props:{
			menuItems:{
				type:Array,
				default:[]
			},
			showMenu:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			showCover(){
				this.showMenu=!this.showMenu;
			},
			loginOut(){
				//系统退出
			}
		},
		components:{
			userheader:UserHeader
		}
	}
</script>

<style type="text/css" scoped>


	ul{
		padding: 0px;
		margin: 0px;
	}
	.page-cover {
	  
	}
	.nav-list{
		position: fixed;
	    top: 0;
	    bottom: 0;
	    left: -200px;
	    width: 200px;
	    background-color: #fff;
	    color: #313131;
	    transition: all .3s ease;
	    z-index: 99;

	}
	.showside {
	   transform: translateX(200px);
	}
	


	/*侧边栏列表*/
	.list-ul,.loginout{
	    margin: 0 24px;
	    border-top: 1px solid #d4d4d4;
	    overflow: hidden;
	    padding-top: 9%;
	    list-style-type: none;
	    
	}

	.list-ul>li,.loginout>li {
        font-size: 14px;
        font-weight: 200;
        padding: 9% 0;
        text-align: left;
        text-indent: 1px;
        line-height: 15px;
        color: #7f8c8d;
        display: block;
        cursor: pointer;
    }

    .list-ul>li:active,.loginout>li:active {
       background-color: darkorange;
       color: red;
    }


	 .list-ul>li:before,.loginout>li:before{
        color: #2c3e50;
        margin: 0 20px;
        font-size: 14px;
    }

    .list-ul>li:last-child {
        margin-bottom: 50px;
    }

    .list-ul>.line{
        border-top: 1px solid #d4d4d4;
    }
    .list-ul>a {
        display: block;
        color: #313131;
    }
</style>