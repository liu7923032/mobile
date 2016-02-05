<template>
	<div class="page logInfo">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back()"></span>
			<span class="icon-plus" slot="rightBar" @click="addTask"></span>
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
		name:'loginfo',
		data(){
			return {
				curDay:''
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
			},
			addTask(){
				this.$route.router.go({name:'logdetail',params:{date:this.curDay,type:'add'}});
			}
		}
	}
</script>

<style type="text/css">
	
</style>