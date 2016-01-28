<template>
    <section class="dialog"  v-show="show">
        <section class="dialog-mask"></section>
        <section class="dialog-content">
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
    
    .dialog-content{
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
    }

    .dialog-content>.dialog-hd{
        padding: 1.2em 20px .5em;
        font-weight: 400;
        font-size: 17px;
    }

    .dialog-content>.dialog-bd{
        text-align: left;
         padding: 0 20px;
        font-size: 15px;
        color: #888;
    }

    .dialog-content>.dialog-ft{
        position: relative;
        line-height: 42px;
        margin-top: 20px;
        font-size: 17px;
        display: flex;
        display: flexbox;
    }

    .dialog-ft:before{
        content:" ";
        position: absolute;
        width: 8.14px;
        height: 1.08px;
        background: rgb(209, 209, 213);
        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
        border-radius: 1px;
        transform-origin: left 50% 0px;
        width: 100%;
    }

    .dialog-ft>a{
        flex:1;
        -webkit-box-flex:1;
    }



	  
</style>