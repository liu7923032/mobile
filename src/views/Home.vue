<template>
	<div class="page">
		<toolbar :text="title">
			<span class="icon-reorder" slot="leftBtn" @click="openMenu"></span>
            <span class="icon-refresh" slot="rightBtn" @click="refresh"></span>
		</toolbar>
		<div class="page-bd">
			<tabs :active-index.sync="index" >
				<tab v-for="item in tabItems" :header="item.title" >
					<list>
						<li v-for="subItem in item.infoList" >
							<div class="tab_info">
								<div class="left">
									<img src="" alt="">
									<div class="content">
										<div>
											<span>发布时间:{{subItem.time}}</span>
											<span>发布人:{{subItem.subUser}}</span>
										</div>
										<div>
											{{subItem.content}}
										</div>
									</div>
								</div>
								<div>
									<i class="icon-chevron-right"></i>
								</div>
							</div>
						</li>
					</list>
				</tab>
			</tabs>
		</div>
	</div>
		
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
    import List from 'src/components/List.vue'
     import ListItem from 'src/components/ListItem.vue'
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
            loading:Loading,
            list:List,
            listitem:ListItem
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
				index:0,
				isload:false,
				showMenu:false,
				tabItems:[{
					title:'通知',infoList:[{
						imgUrl:'',
						time:'2015-11-20',
						subUser:'张三',
						content:'我的世界你不懂1'
					},{
						imgUrl:'',
						time:'2015-11-21',
						subUser:'张三',
						content:'我的世界你不懂2'
					},{
						imgUrl:'',
						time:'2015-11-22',
						subUser:'张三',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						subUser:'张三',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					},{
						imgUrl:'',
						time:'2015-11-22',
						subUser:'张三',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						subUser:'张三',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					},{
						imgUrl:'',
						time:'2015-11-22',
						subUser:'张三',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						subUser:'张三',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					},{
						imgUrl:'',
						time:'2015-11-22',
						subUser:'张三',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						subUser:'张三',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					},{
						imgUrl:'',
						time:'2015-11-22',
						subUser:'张三',
						content:'我的世界你不懂3'
					},{
						imgUrl:'',
						time:'2015-11-23',
						subUser:'张三',
						content:'我的世界你不懂4'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					}]
				},{
					title:'制度',infoList:[{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
					},{
						imgUrl:'',
						time:'2015-11-24',
						subUser:'张三',
						content:'我的世界你不懂5'
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
	.tab_info{
		height: 40px;
		padding: 5px;
		display: flex;
		flex-flow:row nowrap;
		justify-content:space-between;
		align-items:center;
		background-color: white;
	}


	.tab_info>div:nth-child(2){
		margin-right: 5px;
		color: #272822;
	}
	
	.left{
		display: flex;
		flex-flow:row nowrap;
		justify-content:flex-start;
		align-items:center;
	}
	.left>div{
		margin-left: 10px;
	}

	.contentList{
		background-color: whitesmoke;
		width: 100%;
	}
	.contentList>li{
		border-radius: 3px;
		list-style-type: none;
		border:1px solid whitesmoke;
		margin-bottom:5px;
	}

	.contentList>li:hover{
		border:1px solid gray;
	}

	.content>div:nth-child(1){
		font-size: 12px;
		color: lightdark;
		margin-bottom: 5px;
	}

	.content>div:nth-child(1)>span:nth-child(2){
		margin-left: 10px;
	}

	.content>div:nth-child(2){
		font-size: 14px;
		
	}

	img{
		width: 40px;
		height: 40px;
		border-width: 0px;
	}
</style>