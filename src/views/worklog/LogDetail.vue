<template>
	<div class="page logDetail">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back()">返回</span>
		</nav-bar>	
		<page-body>
			
		</page-body>
	</div>
</template>


<script lang="babel">
	
	import NavBar from '../../components/NavBar.vue'
	import PageBody from '../../components/PageBody.vue'
	import {Loading} from 'vue-weui'

	export default {
		name:'logdetail',
		data(){
			return {
				curDay:'',
				type:''
			}
		},

		route:{
			//加载数
			data(transition){
				console.log(transition);
				//加载数据
			  this.curDay=transition.to.params.date;
			}
		},
		components:{
			NavBar,
			PageBody
		},
		methods:{
			back(){
				history.back();
			}

		},
		route:{
			data(){
				//1：获取传递过来的参数
			}
		}
	}
</script>

<style type="text/css">
	
</style>