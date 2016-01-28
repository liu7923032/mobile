<!-- 下拉刷新组件 -->

<template>
	<section class="pull-list" v-touch:pandown="pullToRefresh" v-touch:panup="loadMore" v-touch:panend="panleave"   >
		<header class="pull-header">
			<div>
				<img class="downImg" src="../assets/images/components/icon-down.png" alt="下拉">
			</div>
			<div>
				<p>{{refreshText}}</p>
				<p>最后更新:{{rlastTime}}</p>
			</div>
		</header>
		<div class="pull-content" v-on:scroll="scroll($event)" v-el:listContent>
			<slot ></slot>
		</div>
		<footer class="pull-footer" v-show="showfooter">
			<div>
				<img class="upImg" src="../assets/images/components/icon-up.png" alt="上拉">
			</div>
			<div>
				<p>{{moreText}}</p>
				<p>最后更新:{{mlastTime}}</p>
			</div>
		</footer>
	</section>
	
</template>

<script lang="babel">

	import dateHelper from './utils/DateHelper.js'

	export default {
		data(){
			return {
				rlastTime:'',
				mlastTime:'',
				refreshText:'下拉刷新',
				moreText:'加载更多',
				//是否触发事件
				isRefresh:false,
				//是否显示底部加载更多
				showfooter:false,
				//下拉和上拉的标识
				arrow:'down',
				//滚动条是否在顶部
				top:0,
				//滚动条是否在底部
				isBottom:false,
				//屏幕的高度
				regionHeight:100,
				//内容的高度
				winHeight:100
			}
		},
		ready(){
			//得到对应的高度
			this.regionHeight=this.$el.offsetHeight;
			var listObj=this.$el.getElementsByTagName('ul')[0];
			this.winHeight=listObj.offsetHeight;
			console.log("可见区域的高度："+this.regionHeight+"-内容总高度:"+this.winHeight);

		},
		methods:{

			move(height){
				var list=this.$el;
				//获取角度
				var rotateHeight=height<90?height*2:180;
				if(this.arrow=="down"){
					list.style.transform="translateY("+height+"px)";
					var img=list.getElementsByTagName('header')[0].getElementsByTagName('img')[0];
					img.style.transform="rotate("+rotateHeight+"deg)"
				}else{
					list.style.transform="translateY(-"+height+"px)";
					//先检查底部的div是否显示出来,如果显示出来了,那么在找到对应的图标
					if(list.getElementsByTagName('footer')[0]){
						var img=list.getElementsByTagName('footer')[0].getElementsByTagName('img')[0];
						img.style.transform="rotate("+rotateHeight+"deg)"
					}
				}
			},
			//检查是否滚动到底部,滚动到底部触发上拉加载更多的事件
			scroll(e){
				this.top=e.target.scrollTop;
				if(this.top+this.regionHeight>this.winHeight){
					this.isBottom=true;
				}else{
					this.isBottom=false;
				}
			},
			getCurTime(){
				 var date=new Date();
				// return date.getFullYear()+""
			},
			panleave(e){
				
				if(this.arrow=="down"){
					this.move(0)
					this.refreshText="下拉刷新";
					//得到当前的时间
					if(this.isRefresh){
						this.isRefresh=false;
						this.rlastTime=dateHelper.getNowDate("yyyy-MM-dd HH:mm:ss");
						this.$emit('reload');
					}
					// this.$broadcast('list-reload');
				}else if(this.arrow=="up"){
					this.showfooter=false;
					this.moreText="加载更多";
					this.move(0)
					if(this.isRefresh){
						this.isRefresh=false;
						this.mlastTime=dateHelper.getNowDate("yyyy-MM-dd HH:mm:ss");
						this.$emit('loadmore');
					}
				}
			},
			// 下拉刷新事件
			pullToRefresh(e){
				if(this.top==0){
				 	var distance=e.distance;
				 	this.arrow='down';
				 	this.move(distance);
				 	if(distance>90){
						this.refreshText="松开后刷新";
				 		this.isRefresh=true;
				 	}
				}
			},
			//加载更多
			loadMore(e){
				//判断滚动的距离+当前窗口的宽度是否
				if(this.isBottom){
					this.showfooter=true;
					this.arrow='up';
					var distance=e.distance;
				 	// console.log("拉动的距离"+distance)
				 	this.move(distance);
				 	if(distance>90){
						this.moreText="松开后刷新";
				 		this.isRefresh=true;
				 	}
				}
			}
		}
	}
</script>


<style >

	/*list集合*/
	.pull-list{
		display: flex;
	   	flex-flow:column nowrap;
	  	min-height: 120px;
	  	justify-content:flex-start;
	  	flex:0 1 auto;
	   	height: 100%;
	}

	
	.pull-header,.pull-footer{
	     display: flex;
     	 flex-flow:row nowrap;
	     min-height: 60px;
	     height: 60px;
	     justify-content:center;
	     flex:0 1 auto;
	     align-items:center;
	     aiign-content:center;
	}

	.pull-header{
	    
		margin-top: -60px;
		border-bottom: 1px solid whitesmoke;

	}
	.pull-footer{
		margin-bottom: -60px;
		border-top: 1px solid whitesmoke;
	}

	.pull-header>img,.pull-footer>img{
		 transition: transform .3s ease;
	      -moz-transition: transform .3s ease;/* Firefox 4 */
	      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
	      -o-transition: transform .3s ease; /* Opera */
	}


	.pull-header>div,.pull-footer>div{
		font-size: 12px;
		margin-left: 12px;
	}
	

	.pull-content{
		overflow: auto;
	    -webkit-overflow-scrolling: touch;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-flex: 0 1 auto;
	    -ms-flex: 0 1 auto;
	    flex: 0 1 auto;
	    margin-bottom: 10px;
	    margin: 0px;
	    flex-flow:column nowrap;
	    padding: 0px;
	}
</style>