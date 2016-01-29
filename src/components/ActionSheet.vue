<template>
	<!--  -->
    <section id="actionsheet_wrap" >
    	<!--遮罩  -->
    	<div class="mask_transition" transition="mask" v-show="showsheet" v-touch:tap="close"></div>
    	<!-- 按钮组 -->
        <div class="actionsheet" v-show="showsheet" transition="expand">
        	<ul class="actionsheet_menu">
        		<li v-for="item in btnItems" class="actionsheet_cell" v-touch:tap="actionClick($index)">
        			{{item}}
        		</li>
        	</ul>
            <div class="actionsheet_action">
                <div class="actionsheet_cell" v-touch:tap="close">取消</div>
            </div>
        </div>
    </section>
    <!--END actionSheet-->
</template>


<script>
	export default {
		props:{
			//按钮组
			btnItems:{
				type:Array,
				default:[]
			},
			showsheet:{
				type:Boolean,
				default:false
			}
		},
		created(){
			console.log("进入actionSheet:"+this.showsheet);
		},
		methods:{
			actionClick(index){
				this.$dispatch('action-click',index);
			},
			close(){
				this.showsheet=!this.showsheet;
				console.log(this.showsheet);
			}
		}
	}
</script>


<style>
	.actionsheet_wrap{
		width: 100%;
		padding: 0px;
		margin: 0px;
		height: 100%;
	}

	.mask-transition{
		background: rgba(0, 0, 0, 0.6);
		position:fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 10;
		transition:background .3s;
	}
	
	.mask-enter,.mask-leave{
		background: rgba(0, 0, 0, 0);
	}
	
	.actionsheet{
			/*background-color:#EFEFF4;*/
		background-color:#D9D9D9;
	}

	.expand-transition{
	
		transition:transform .3s;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		
		z-index: 20;
		backface-visibility:hidden;
	}

	.expand-enter, .expand-leave {
	 	transform:translate(0,100%);
	}

	.actionsheet_cell{
		position: relative;
	    padding: 10px 0;
	    text-align: center;
	    font-size: 18px;
	    background-color: #fff;
	}

	.actionsheet_cell:before{
		content:'';
		border-top:1px solid #D9D9D9;
		color:#D9D9D9;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		transform:scaleY(0.5);
	}

	.actionsheet_action{
		margin-top:6px;
		background-color: #fff;

	}

</style>