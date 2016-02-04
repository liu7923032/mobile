<template>
	<div class="page worklog">
		<nav-bar text="工作日志">
			<span class="icon-chevron-left" slot="leftBar" @click="back()"></span>
			<span slot="rightBtn"></span>
		</nav-bar>
		<page-body>
			<cells-title>
				<div>开始:{{startDay}} 结束:{{endDay}}</div>
			</cells-title>
			<cells type="access">
				<link-cell v-for="item in dateRange">
					<div slot="header">{{ getZNWeek($index) }}</div>
					<div slot="body">
						<div>
							{{item}}
						</div>
					</div>
				</link-cell>
			</cells>
		</page-body>
	</div>
	
</template>

<script>
	import NavBar from '../components/NavBar.vue';
	import PageBody from '../components/PageBody.vue'
	import {Cells,Cell,CellsTitle,LinkCell} from 'vue-weui'
	import DateHelper from '../public/js/DateHelper.js'

	export default {
		data(){
			return {
				title:'工作日志',
				startDay:'',
				endDay:'',
				dateRange:[]
			}
		},
		ready(){
			this.startDay=DateHelper.weekFirstDay();
			console.log(this.startDay);
			this.endDay=DateHelper.weekLastDay();
			this.dateRange=this.getDateRange();
		},
		methods:{
			back(){
				history.back();
			},
			//子控件触发事件后执行的方法
			selectDay(day){
				alert(day);
			},
			getDateRange(){
				var tempRange=[];
				//1:得到当前月份的天数
				var date=new Date();
				var month=date.getMonth()+1;
				var year=date.getFullYear();
				var days=DateHelper.dayNumOfMonth(year,month);
				//2:得到
				var firstDay=parseInt(this.startDay.split('-')[2]);
				if(firstDay+7>days){

				}else{
					for (var i = firstDay,length=firstDay+7; i <length; i++) {
						var tempDate=new Date(year+"/"+month+"/"+i);
						tempRange.push(
							DateHelper.formate(tempDate,"yyyy-MM-dd")
						);
					};
				}
				return tempRange;
			},
			getZNWeek(flag){
				var array=["周一","周二","周三","周四","周五","周六","周日"];
				return array[flag];
			}
		},
		components:{
			NavBar,
			PageBody,
			Cells,
			Cell,
			CellsTitle,
			LinkCell
		}
	}
</script>

<style scoped>
	.weui_cells_title>div{
		text-align: center;
		font-size: 17px;
		margin-bottom: 10px;
	}

	.weui_cell_bd>div{
		padding-left: 10px;
	}
</style>