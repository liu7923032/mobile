<template>
		<toolbar :text="title">
			<span class="icon-reorder" slot="leftBtn" @click="openMenu"></span>
            <span class="icon-refresh" slot="rightBtn" @click="refresh"></span>
		</toolbar>
		<tabs :active-index.sync="index">
			<tab v-for="item in tabItems" :header="item.title">
				
			</tab>
		</tabs>
		<sidebar :menu-items="menuItems" :show-menu.sync="showMenu" >
			
		</sidebar>
	
		<loading :loading="isload"></loading>

</template>

<script lang="babel">
	import ToolBar from 'src/components/ToolBar.vue'
    import SideBar from 'src/components/Sidebar.vue'
    import Tabs from 'src/components/Tabs.vue'
    import Tab from 'src/components/Tab.vue'
    import Loading from 'src/components/Loading.vue'
	export default 	{
		created(){
			console.log("home is created")
			//计算tab的长度
		   // var width=	document.body.offsetWidth-20;
		   // this.tabWidth=width/this.tabItems.length;
		},
		components:{
	    	toolbar:ToolBar,
            sidebar:SideBar,
            tabs:Tabs,
            tab:Tab,
            loading:Loading
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
				index:1,
				isload:false,
				showMenu:false,
				tabItems:[{
					title:'通知',infoList:[{
						imgUrl:'',
						time:'2015-11-20',
						content:'我的世界你不懂1'
					},{
						imgUrl:'',
						time:'2015-11-21',
						content:'我的世界你不懂2'
					},{
						imgUrl:'',
						time:'2015-11-22',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						content:'我的世界你不懂5'
					}]
				},{
					title:'公告',infoList:[{
						imgUrl:'',
						time:'2015-11-20',
						content:'我的世界你不懂'
					}]
				},{
					title:'制度',infoList:[{
						imgUrl:'',
						time:'2015-11-20',
						content:'我的世界你不懂'
					}]
				}]
			}
		},
		route:{
			data(){
				//从服务器端加载数据
				console.log("home组件切入,加载初始数据");
				//加载数据
				this.isload=false;
				this.$http.get("values").then((response)=>{
					console.log(response.data);
					this.isload=false;
				});

			},
			canDeactivate(transition){
				//组件被切除
				console.log("组件被切出")
				this.showMenu=false;
				transition.next();
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

<style type="text/css" scoped>
	.tabItem{
		height: 80px;
		padding: 10px;
		display: flex;
		flex-flow:row nowrap;
		justify-content:space-around;
		border:1px solid gray;
	}

	img{
		width: 40px;
		height: 40px;
		border-width: 0px;
	}
</style>