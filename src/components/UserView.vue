<template>
	<div class="container-fluid">
		<div class="toolbar">
		<span class="glyphicon glyphicon-arrow-left" @click="back"></span>
			<span class="text-title">{{title}}</span>
		</div>
		<div class="container-fluid">
			
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				title:"我的地盘"
			}
		},
		methods:{
			back(){
				history.pushState()
			}
		},
		route:{
			activate:function (argument) {
				this.$root.isShow=false;
				// body...
				console.log('1')
			}
		}
	}
</script>