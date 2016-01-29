<template>
    <section class="dialog"  v-show="show">
        <section class="dialog-mask"></section>
        <section class="dialog-content" v-show="show" transition="dialog">
            <section class="dialog-hd">{{title}}</section>
            <section class="dialog-bd">
                <slot name="dialog-bd"></slot>
            </section>
            <section class="dialog-ft" v-if="isAlert">
            <!-- 判断类别,如果是 -->
                <a href="javascript:;" class="weui_btn_dialog primary" v-touch:tap="close">确定</a>
            </section>
            <section class="dialog-ft" v-else>
            <!-- 判断类别,如果是 -->
                <a href="javascript:;" class="weui_btn_dialog default" v-touch:tap="close">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" v-touch:tap="confirm">确定</a>
            </section>
        </section>
    </section>

</template>

<script lang="babel">
	
	export default {
		methods:{
			// 关闭dialog
			close(){
				this.show=!this.show;
			},
			confirm(){
				//将事件派发到父组件中,在通过父组件进行监听该事件
				this.$dispatch('child-confirm');
			}
		},
		props:{
			show:{
				type:Boolean,
				default:false,
				require:true
			},
            isAlert:{
                type:Boolean,
                default:false
            },
			//显示效果
			effect:{
				type:String,
				default:'fade'
			},
			title:{
				type:String,
				default:''
			}
		}
	}
</script>

<style  type="text/css" scoped>
	
    .dialog{
        padding: 0px;
        margin: 0px;
    }

    /*遮罩层*/
    .dialog-mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 10;
    }
    
    /*dialog的过度效果*/
    .dialog-transition{
        position: fixed;
        z-index: 20;
        width: 85%;
        top: 50%;
        left: 50%;
        max-width: 400px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        text-align: center;
        border-radius: 3px;
        transition:top .3s ease;
    }

    .dialog-enter,.dialog-leave{
        top: 0;
    }

   /* .dialog-content{
        position: fixed;
        z-index: 20;
        width: 85%;
        top: 50%;
        left: 50%;
        max-width: 400px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        text-align: center;
        border-radius: 3px;
    }*/

    
    .dialog-hd{
        padding: 1.2em 20px .5em;
        font-weight: 400;
        font-size: 17px;
    }

    .dialog-bd{
        text-align: left;
         padding: 0 20px;
        font-size: 15px;
        color: #888;
    }

    .dialog-ft{
        position: relative;
        line-height: 42px;
        margin-top: 20px;
        font-size: 17px;
        display: flex;
        /*display: flexbox;*/
    }

    .dialog-ft:after{
        content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          border-top: 1px solid #D5D5D6;
          color: #D5D5D6;
          -webkit-transform-origin: 0 0;
          -ms-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          -ms-transform: scaleY(0.5);
          transform: scaleY(0.5);
    }

    .dialog-ft>a{
        flex:1;
        -webkit-box-flex:1;
        text-decoration:none;
        display: block;
    }

    
    .dialog-ft>a:after{
        border-left: 1px solid #D5D5D6;
        color: #D5D5D6;
        content:" ";
        width:1px;
        height: 100%;
        left: 50%;
        top: 0;
        position: absolute;
        transform:scaleX(0.5);
    }

    .dialog-ft a:nth-child(1):after{
        display: none;
    }

  
	  
</style>