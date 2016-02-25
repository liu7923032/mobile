<template>
	<div class="page logDetail">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back()">返回</span>
		</nav-bar>	
		<page-body >
			<cells type="form">
				<input-cell type="text" name="SubTitle" placeholder="输入标题" label="日志标题" :value.sync="title" :warn="ckTitle">
				</input-cell>
				<input-cell type="time" name="StartTime"  label="开始时间" placeholder="开始时间" value="08:50">
				</input-cell>
				<input-cell type="time" name="EndTime"  label="结束时间" placeholder="结束时间" value="17:00">
				</input-cell>
				<select-cell
				  :after="true"
				  :options="['中国', '美国', '英国']"
				  :selected.sync="wType">
				  <span slot="header">工作类型</span>
				</select-cell>
				<link-cell>
					<div slot="header">选择项目</div>
					<div slot="body">
						<input type="hidden" >
					</div>
					<span slot="footer">
					</span>
				</link-cell>
				<select-cell
				  :after="true"
				   :options="['项目工作', '研发工作', '合同处理']"
				  :selected.sync="subType">
				  <span slot="header">工作类型</span>
				</select-cell>
				<input-cell type="textarea" :value.sync="memo" :warn="ckMemo" :rows="textRows" placeholder="日志类容" slot="body"></input-cell>
			</cells>
			<button-area>
				<button @click="saveLog">
					提交
				</button>
			</button-area>
			<cells type="form">
				
			</cells>		
		</page-body>

		<toast type="loading" v-show="isloading">
			保存中。。
		</toast>
	</div>
</template>


<script lang="babel">
	
	import NavBar from '../../components/NavBar.vue'
	import PageBody from '../../components/PageBody.vue'
	import {Toast,Cells,CellHeader,CellBody,InputCell,SelectCell,Cell,LinkCell,ButtonArea,Button,Icon} from 'vue-weui'

	export default {
		name:'logdetail',
		data(){
			return {
				curDay:'',
				type:'',
				typeOptions:[{id:'XMGZLB',text:"项目工作类别"},
						  {id:'RCGZLB',text:"日常工作类别"},
						  {id:'SHGZLB',text:"售后工作类别"}],
				textRows:5,
				wType:'XMGZLB',
				subType:'',
				title:'',
				memo:'',
				subTypeData:[],
				ProjectCode:'',
				isloading:false
			}
		},
		route:{
			//加载数
			data(transition){
				console.log(transition);
				//加载数据
			  this.curDay=transition.to.params.date;
			  this.type=transition.to.params.type=="add"||'edit';
			  
			}
		},
		computed:{
			ckTitle:function () {
				return this.title.length==0;
			},
			ckMemo:function(){
				return this.memo.length==0;
			}
		},
		components:{
			NavBar,
			PageBody,
			Toast,
			Cells,
			CellHeader,
			CellBody,
			Cell,
			InputCell,
			SelectCell,
			Button,
			LinkCell,
			Icon,
			ButtonArea
		},
		methods:{
			back(){
				history.back();
			},
			saveLog(){
				//1:提交表单内容
				var postData={
					SubTitle:this.title,
					StartTime:this.curDay+" "+this.sTime,
					EndTime:this.curDay+" "+this.eTime,
					WorkType:this.wType,
					ProjectCode:this.ProjectCode,
					ActionUser:this.$root.userId,
					SubItem:this.subType+"-"+this.memo
				};
				this.isloading=true;
				this.$http.post("WorkLog",postData).then((success)=>{
					this.isloading=false;
				},(error)=>{
					this.isloading=false;
				});
			}
		}
	}
</script>

<style type="text/css">
	
	.weui_label{
		width: 4em;
	}

	.logDetail .page-bd{
		padding-bottom: 30px;
	}
</style>