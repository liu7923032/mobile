<template>
	<div class="page-cover" v-if="showMenu" @click="showCover">
	</div>

	 <section id="sideBar" class="nav-list" :class="{'showside':showMenu}" >
	    <userheader></userheader>
        <ul class="list-ul">
        	<li v-for="item in menuItems"  :class="item.icon" v-link="{'name':item.link}" @click="enterPage()">{{item.text}}</li>
        </ul>
    </section>
</template>

<script type="text/javascript">

	import UserHeader from './UserHeader.vue';
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
			enterPage(){
				alert('1');
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
	    position: fixed;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    background: rgba(0, 0, 0, .4);
	    z-index: 7;
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
	.list-ul {
	    margin: 0 24px;
	    border-top: 1px solid #d4d4d4;
	    overflow: hidden;
	    padding-top: 9%;
	    list-style-type: none;
	    
	}

	.list-ul>li {
        font-size: 14px;
        font-weight: 200;
        padding: 9% 0;
        text-align: left;
        text-indent: 1px;
        line-height: 15px;
        color: #7f8c8d;
        display: block;
    }

	 .list-ul>li:before{
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