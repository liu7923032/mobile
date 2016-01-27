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
	export default {
		data(){
			return {
				rlastTime:'2016-01-27',
				mlastTime:'2015-02-22',
				refreshText:'下拉刷新',
				moreText:'加载更多',
				isRefresh:false,
				showfooter:false,
				arrow:'down',//下拉和上拉的标识
				top:0
			}
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
			scroll(e){
				console.log(e);
				this.top=e.target.scrollTop;
				console.log("list集合的滚动"+e.target.scrollTop);
			},
			getCurTime(){
				// var date=new Date();
				// return date.getFullYear()+""
			},
			panleave(e){
				
				if(this.arrow=="down"){
					this.move(0)
					this.refreshText="下拉刷新";
					//得到当前的时间
					if(this.isRefresh){
						this.isRefresh=false;
						this.$emit('reload');
					}
					// this.$broadcast('list-reload');
				}else if(this.arrow=="up"){
					this.showfooter=false;
					this.moreText="加载更多";
					this.move(0)
					if(this.isRefresh){
						this.isRefresh=false;
						this.$emit('loadmore');
					}
				}
			},
			getScrollTop(){
				var scrollPos; 
				if (window.pageYOffset) {
					scrollPos = window.pageYOffset;
				} 
				else if (document.compatMode && document.compatMode != 'BackCompat') {
				 scrollPos = document.documentElement.scrollTop;
				} else if (document.body) { 
					scrollPos = document.body.scrollTop;
			    } 
			    return scrollPos; 
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
				//得到滚动的距离

				var listObj=this.$el.getElementsByTagName('ul')[0];
				// console.log(listObj);
				//1:滚动的高度
				// console.log(listObj);
				var scrollHeight=this.top;
				//2:可见区域的高度
				var offsetHeight=document.body.offsetHeight;

				//3:整个内容的高度
				var winHeight=listObj.scrollHeight;

				console.log("滚动条距离窗口的高度:"+scrollHeight+"-窗口的可见区域："+offsetHeight+"整个ul的高度:"+winHeight);
				//判断滚动的距离+当前窗口的宽度是否
				if((winHeight-5)<(scrollHeight+offsetHeight)){
					console.log('触发加载更多事件')
					this.showfooter=true;
					this.arrow='up';
					var distance=e.distance;
				 	console.log("拉动的距离"+distance)
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
	  	min-height: 35px;
	  	justify-content:flex-start;
	  	flex:0 1 auto;
	   	height: 100%;
	}

	
	.pull-header,.pull-footer{
	     display: flex;
     	 flex-flow:row nowrap;
	     min-height: 35px;
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
	   
	    flex-flow:column nowrap;
	    padding: 5px;
	}
</style>