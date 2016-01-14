<template>
	<toolbar :text="title">
		<span class="icon-chevron-left" slot="leftBtn" @click="back()"></span>
		<span slot="rightBtn"></span>
	</toolbar>
	<calendar v-on:item-click="selectDay"></calendar>
</template>

<script>
	import ToolBar from '../components/ToolBar.vue';
	import Calendar from '../components/Calendar.vue'
	export default {
		data(){
			return {
				title:'工作日志'
			}
		},
		methods:{
			back(){
				history.back();
			},
			//子控件触发事件后执行的方法
			selectDay(day){
				alert(day);
			}
		},
		components:{
			toolbar:ToolBar,
			calendar:Calendar
		}
	}
</script>