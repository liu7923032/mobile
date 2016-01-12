<template>
	<div class="dlg-modal" v-if="show">
        <div class="dlg-content fade" :class="{'in':show}" :style="{width:dlgWidth+'px'}">
            <div class="dlg-header">
                <span>{{title}}</span>
            </div>
            <div class="dlg-body">
                <slot name="dlg-body"></slot>
            </div>
            <div class="dlg-footer">
                <span @click="confirm" :style="{width:dlgWidth/2 +'px'}"><i class="icon-ok"></i>确定</span>
                <span @click="close" :style="{width:dlgWidth/2 +'px'}"><i class="icon-remove"></i>关闭</span>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
	
	export default {
		created(){
			//初始化弹出框的宽度
			console.log("dialog init")
		},
		data(){

		},
		methods:{
			// 关闭dialog
			close(){
				this.show=false;
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
			//显示效果
			effect:{
				type:String,
				default:'fade'
			},
			dlgWidth:{
				type:Number,
				default:300
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
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 10;
            background-color: rgba(153, 153, 153, 0.5);
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            font-size: 14px;
            align-items: center;
        }
        
        .dlg-modal>.dlg-content {
            position: relative;
            background-color: whitesmoke;
            width: 300px;
            transition: all .3s ease-in;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            border: 1px solid rgba(0, 0, 0, .2);
        }
        
        .dlg-content>.dlg-header {
            padding: 10px;
            font-weight: bold;
            border-bottom: 1px solid lightgray;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            cursor: pointer;
        }
        
        .dlg-content>.dlg-body {
            padding: 10px;
        }
        
        .dlg-content>.dlg-footer {
            border-top: 1px solid lightgray;
            display: flex;
            display: -webkit-flex;
            flex-wrap: row nowrap;
            justify-content: space-around;
            align-items:center;
            cursor: pointer;
            height: 36px;
            text-align: center;
        }

        
        .dlg-footer>span {
           font-size: 16px;
           line-height: 36px;
        }

        .dlg-footer>span>i {
           margin-right: 5px;
        }

		
        .dlg-footer>span:hover {
          	color: darkorange;
        }

        .dlg-footer>span:active {
          	box-shadow: 1px 1px 4px darkgray;
          	color: darkorange;
        }

        
        .dlg-footer>:first-child {
           border-right: 1px solid darkgray;
        }

        .fade {
            opacity: 0;
            -webkit-transition: opacity .15s linear;
            -o-transition: opacity .15s linear;
            transition: opacity .15s linear;
        }
        
        .fade.in {
            opacity: 1;
        }
</style>