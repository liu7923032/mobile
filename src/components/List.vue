<!-- 下拉刷新组件 -->
<template>
	<section class="pull-list" >
		<header class="pull-header" v-show="showheader" transition="display">
			<div class="imgshow">
                <img src="../assets/images/components/icon-down.png" alt="下拉">
            </div>
            <div class="content">
                <p>{{refreshText}}</p>
                <p>最后更新:{{rlastTime}}</p>
            </div>
		</header>
		<ul class="pull-content"  v-el:listContent>
			<slot></slot>
		</ul>
		<footer class="pull-footer" @click="loadMore($event)" >
			点击加载更多
		</footer>
	</section>
</template>

<script lang="babel">

	import dateHelper from '../public/js/DateHelper.js'

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
		events:{
			//监听父窗体的的滚动事件
			"scroll":"onScroll"
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
			panleave(e){
				console.log("离开屏幕");
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
			onScroll(e){
				this.top=e.target.scrollTop;
				console.log("滚动的高度:"+this.top);
				if(this.top+this.regionHeight>=this.winHeight){
					this.isBottom=true;
				}else{
					this.isBottom=false;
				}
			},
			// 下拉刷新事件
			pullToRefresh(e){
				console.log("下拉刷新");
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
	   /*	height: auto;
        width: 100%;
        height: 100%;
        padding: 0px 0px;
        background-color: whitesmoke;
        position: relative;
         overflow: auto;
    	-webkit-overflow-scrolling: touch;*/
	}

	.pull-content{
	    padding: 0px;
	    margin: 0px;
	    /*height: 100%;*/
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

    .pull-footer{
    	height: 40px;
    	padding: 10px;
		border-radius: 5px;
    	text-align: center;
    }
	
	
</style>