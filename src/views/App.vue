<template>
  <div class="container js_container">
      <!-- main view -->
      <router-view
        class="view"
        keep-alive
        transition="slide">
      </router-view>
  </div>
</template>


<script lang="babel">
    import auth from './utils/auth.js'
    export default {
      data(){
        userId:0
      },
      created(){
        this.userId=auth.getUser().userId||0;
        console.log("App.vue当前的登陆人是:"+this.userId);
      }
    }
</script>

<style type="text/css">
	
/*当你设置一个元素为 box-sizing: border-box; 时，此元素的内边距和边框不再会增加它的宽度*/
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}


/*单页面的布局*/

html, body {
    -webkit-tap-highlight-color: transparent;
    overflow-x: hidden;
}


body, .page {
    background-color: #FBF9FE;
    /*background-color: #F5E1BA;*/
}

/*最底层布局*/
.container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
}

/*页面的布局*/
.page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
}

.space{
	padding: 5px 15px;
}


.page.slideIn {
    animation: slideIn .2s forwards;
}

.page.slideOut {
    animation: slideOut .2s forwards;
}

/*页面切换动画*/
@keyframes slideIn {
    from {
        transform: translate3d(100%, 0, 0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slideOut {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(100%, 0, 0);
    }
}


.slide-transition {
  transition: left 0.3s ease;
  width: 100%;
}

.slide-enter, .slide-leave {
  left: 100%;
}

.slide-leave {
  left: 100%;
}

.app-transition {
  transition: opacity 0.3s ease;
}

.app-enter, .app-leave {
  opacity: 0;
}


/*内容的布局*/

/*.page-bd {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;
    padding-top: 4px;
}
*/

/*改变weui的背景色*/
.weui_cell{
  /*background-color: #FFF2D9;*/
}


</style>