<template>
	<div class="page logInfo">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back()"></span>
			<span class="icon-plus" slot="rightBar" @click="addTask"></span>
		</nav-bar>	
		<page-body>
			<cells>
				<link-cell v-for="item in logInfo">
					<div slot="body">
						<table class="log">
							<tbody>
								<tr>
									<td class="tdLabel">日志名称</td>
									<td>{{item.LogTitle}}</td>
								</tr>

								<tr>
									<td class="tdLabel">开始时间</td>
									<td>{{item.SDate}}</td>
								</tr>
								<tr>
									<td class="tdLabel">结束时间</td>
									<td>{{item.EDate}}</td>
								</tr>
								<tr>
									<td class="tdLabel">工作类型</td>
									<td >{{item.WType}}</td>
								</tr>
								
								<tr v-for="subItem in item.SubItems">
									<td class="tdLabel">{{subItem.SubType}}</td>
									<td>{{subItem.SubContent}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</link-cell>
			</cells>
		</page-body>

		<Toast type="loading" v-show="isloading"></Toast>
	</div>
</template>


<script lang="babel">
	
	import NavBar from '../../components/NavBar.vue'
	import PageBody from '../../components/PageBody.vue'
	import {Toast,Cells,LinkCell} from 'vue-weui'

	export default {
		name:'loginfo',
		data(){
			return {
				curDay:'',
				logInfo:[],
				userId:0,
				isloading:false
			}
		},

		route:{
			//加载数
			data(transition){
				console.log(transition);
				//加载数据
			  this.curDay=transition.to.params.date;
			  this.userId=this.$root.userId;
			  console.log("loginfo-"+this.userId);
			  this.isloading=true;
			  var rUrl='WorkLog/'+this.curDay+"/10685";

			  this.$http.get(rUrl).then((response)=>{
			  	this.isloading=false;

			  	this.logInfo=response.data;
			  	console.log(this.logInfo)
			  },(error)=>{
			  	this.isloading=false;
			  });
			}
		},
		components:{
			NavBar,
			PageBody,
			Cells,
			LinkCell,
			Toast
		},
		methods:{
			back(){
				history.back();
			},
			addTask(){
				this.$route.router.go({name:'logdetail',params:{date:this.curDay,type:'add'}});
			}
		}
	}
</script>

<style type="text/css">
	.log{
		width: 100%;
	}

	.log>td{
		padding: 5px;
	}
	.tdLabel{
		width: 100px;
	}
</style>