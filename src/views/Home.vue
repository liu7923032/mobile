<template>
		<toolbar :text="title">
			<span class="icon-reorder" slot="leftBtn" @click="openMenu"></span>
            <span class="icon-refresh" slot="rightBtn" @click="refresh"></span>
		</toolbar>
		<navtabs :tab-items="tabItems" :underline="tabWidth" >
		</navtabs>
		<sidebar :menu-items="menuItems" :show-menu.sync="showMenu" >
			
		</sidebar>
</template>

<script lang="babel">
	import ToolBar from 'src/components/ToolBar.vue'
    import SideBar from 'src/components/Sidebar.vue'
    import NavTabs from 'src/components/NavTabs.vue'
	export default 	{
		created(){
			console.log("home is created")
			//计算tab的长度
		   var width=	document.body.offsetWidth-30;
		   this.tabWidth=width/this.tabItems.length;
		},
		components:{
	    	toolbar:ToolBar,
            sidebar:SideBar,
            navtabs:NavTabs
	    },
	    props:{
	    	
	    },
		data() {
			return {
				title:'首页',
				menuItems:[{
					text:'系统首页',
					link:'home',
					icon:'icon-home'
				},{
					text:'个人信息',
					link:'userinfo',
					icon:'icon-user'
				},{
					text:'我的项目',
					link:'project',
					icon:'icon-tasks'
				},{
					text:'工作日志',
					link:'worklog',
					icon:'icon-calendar'
				},{
					text:'流程信息',
					link:'worklog',
					icon:'icon-exchange'
				}],
				showMenu:false,
				tabItems:[{
					title:'通知',content:'啊啊啊通知'
				},{
					title:'公告',content:'啊啊啊公告'
				},{
					title:'制度',content:'啊啊啊制度'
				}],
				tabWidth:0
			}
		},
	    methods: {
	        openMenu() {
	            this.showMenu = !this.showMenu;
	        },
	        refresh(){
	        	//刷新当前页面
	        }
	    }
	}

</script>

<style >
	


</style>