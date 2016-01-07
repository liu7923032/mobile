<template>
	<div class="dlg-modal" v-if="show" 
	:class="{'fade':effect === 'fade',
    		 'zoom':effect === 'zoom'}"
	:style="{'width': dlgWidth + 'px'}"  
	transition="showdlg"  >
		<slot name="dlg-header">
			<div class="dlg-header">
				<h4 class="modal-title" >{{title}}</h4>
				<span class="icon-remove" @click="close"></span>
			</div>
		</slot>
		<slot name="dlg-body"></slot>
		<slot name="dlg-footer">
			<div class="">
				 <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
       			 <button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</slot>
	</div>
</template>

<script lang="babel">
	
	export default {
		data(){

		},
		methods:{
			// 关闭dialog
			close(){
				this.show=false;
			}
		},
		props:{
			show:{
				type:Boolean,
				default:false,
				require:true
			},
			//显示效果
			effect:{
				type:String,
				default:'fade'
			},
			dlgWidth:{
				type:Number,
				default:200
			},
			title:{
				type:String,
				default:''
			}
		}
	}
</script>

<style >
	
	.dlg-modal {
		/*过度系统*/
		transition: all 0.3s ease;
		background-color: rgba(0,0,0,0.5);
	}

	.dlg-header{
		display: flex;
		display: -webkit-flex;
		justify-content:space-between;
		padding: 5px;

	}


	/*dialog过度*/
	.showdlg-transition{
		transition: all .3s ease;
	  	height: 100%;
	  	padding: 10px;
	  	background-color: #eee;
	 	overflow: hidden;
	}

	.showdlg-enter, .showdlg-leave {
		height: 0;
		padding: 0 10px;
		opacity: 0;
	}
</style>