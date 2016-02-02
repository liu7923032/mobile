<!-- 下拉刷新组件 -->
<template>
	<section class="pull-list" v-touch:pandown.stop.prevent="pullToRefresh"  v-touch:panend="panleave"   >
		<header class="pull-header" v-show="showheader" transition="display">
			<div class="imgshow">
                <img src="../assets/images/components/icon-down.png" alt="下拉">
            </div>
            <div class="content">
                <p>{{refreshText}}</p>
                <p>最后更新:{{rlastTime}}</p>
            </div>
		</header>
		<ul class="pull-content"  v-on:scroll.stop.prevent="scroll($event)" v-el:listContent>
			<slot></slot>
		</ul>
		<footer class="pull-footer" v-show="showfooter">
			<div @click="loadMore($event)" >点击加载更多</div>
		</footer>
	</section>
</template>

<script lang="babel">

	import dateHelper from './utils/DateHelper.js'

	export default {
		data(){
			return {
				rlastTime:'',
				refreshText:'下拉刷新',
				//是否触发事件
				isRefresh:false,
				//是否显示底部加载更多
				showheader:false,
				showfooter:false,
				//滚动条是否在顶部
				top:0
			}
		},
		methods:{

			move(height){
				var list=this.$el;
				//获取角度
				var rotateHeight=height<60?height*3:180;
				list.style.transform="translateY("+height+"px)";
				var img=list.querySelectorAll('header')[0].querySelectorAll('img')[0];
				img.style.transform="rotate("+rotateHeight+"deg)"
			},
			//检查是否滚动到底部,滚动到底部触发上拉加载更多的事件
			scroll(e){

				this.top=e.target.scrollTop;
				console.log("可见区域的高度："+this.regionHeight+"-总高度："+this.winHeight);
				console.log("滚动的高度:"+this.top);
				if(this.top+this.regionHeight>=this.winHeight){
					this.isBottom=true;
				}else{
					this.isBottom=false;
				}
			},
			panleave(e){
				this.move(0);
				this.showheader=false;
				this.refreshText="下拉刷新";
				//得到当前的时间
				if(this.isRefresh){
					this.isRefresh=false;
					this.rlastTime=dateHelper.getNowDate("yyyy-MM-dd HH:mm:ss");
					this.$emit('reload');
				}
			},
			// 下拉刷新事件
			pullToRefresh(e){
				if(this.top==0){
					e.preventDefault();
				 	var distance=e.distance;
				 	this.showheader=true;
				 	this.move(distance);
				 	if(distance>90){
						this.refreshText="松开后刷新";
				 		this.isRefresh=true;
				 	}
				}
			},
			//加载更多
			loadMore(e){
				this.$dispatch('loadmore',e);
			}
		}
	}
</script>


<style >

	/*list集合*/
	.pull-list{
	  	/*min-height: 300px;*/
	   	/*height: 100%;*/
        height: 100%;
        width: 100%;
        padding: 0px 0px;
        background-color: whitesmoke;
	}

	.pull-content{
		overflow: auto;
    	-webkit-overflow-scrolling: touch;
	    height: 100%;
	    padding: 0px;
	    margin: 0px;
	    background-color: white;
	    /*width: 100%;*/
	}
	
	.display-transition{
	    text-align: center;
        /*margin: 10px 0px;*/
        width: 100%;
        vertical-align: middle;
        height: 60px;
        /*transform:translateY(100px);*/
        /*padding: 10px 0px;*/
	}

	.display-enter,.display-leave{
		height:0px;
	}

	
	.pull-header img
	{
		 transition: transform .3s ease;
	      -moz-transition: transform .3s ease;/* Firefox 4 */
	      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
	      -o-transition: transform .3s ease; /* Opera */
	}

	.imgshow{
        display: inline-block;
    }
    .content{
        display: inline-block;
        font-size: 12px;
    }

	 .content>p{
            margin: 4px;
    }

	
</style>