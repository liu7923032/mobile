<template>
  <section class="tabs" v-touch:swipeleft.stop.prevent="swipeLeft" v-touch:swiperight.stop.prevent="swipeRight()" role="tablist">
    <section class="nav-tabs">
        <ul class="tabs_title">
            <li v-for="item in tabItems" :style="{ width:underline+ 'px' }"
            :class="{'nav_active':activeIndex===$index}" 
            v-touch:tap="switchTab($index)" 
             >{{item.header}}</li>
        </ul>
        <section id="tabs_line" v-bind:style="{ width:underline+ 'px' }">
        </section>
    </section>
      <!-- Tab panes -->
    <section class="tab-content">
        <slot></slot>
    </section>
  </section>
</template>

<script>
  export default {
    ready(){
        var width=  document.body.offsetWidth-20;
        this.underline=width/this.tabItems.length;
        this.switchTab(this.activeIndex);
    },
    props:{
      effect: {
        type: String,
        default: 'fadein'
      },
      activeIndex:{
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        //当前选中的tab页面
        underline:100,
        tabItems:[]
      }
    },
    methods:{
      //点击tabs
      switchTab(index){

        this.activeIndex=index;
        var leftWidth=index*this.underline;
        // this.$el.getElementById('tabs_line').style.transform="translateX("+leftWidth+"px)";
        document.getElementById('tabs_line').style.transform="translateX("+leftWidth+"px)";
      },
      swipeLeft(){
         
          var tempIndex=this.activeIndex;
          var tabLength=this.tabItems.length-1;
          if(tempIndex==tabLength){
            tempIndex=tabLength;
          }else{
            tempIndex=this.activeIndex+1;
          }
          this.activeIndex=tempIndex;
          this.switchTab(tempIndex);
      },
      swipeRight(){
          var tempIndex=this.activeIndex;
          var tempIndex=this.activeIndex-1;
          if(tempIndex<0){
            tempIndex=0;
          }
          this.activeIndex=tempIndex;
          this.switchTab(tempIndex);
      }
    }
  }
</script>


<style type="text/css" scoped>
    
    .tabs{
        min-height: 35px;
        height: 100%;
        width: 100%;
        position: relative;
      
        margin-top: 5px;
    }

    .nav-tabs{
       min-height: 35px;
       height: 35px;
       width: 100%;
       border-bottom: 2px solid whitesmoke;
       background-color: white;
    }

    .tabs_title{
      margin: 0;
      padding: 5px 10px;

    }

    .tabs_title>li{
      float: left;
      list-style-type: none;
      text-align: center;
    }
    
  /*  .tabs_title {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-flex-flow: row nowrap;
            -ms-flex-flow: row nowrap;
                flex-flow: row nowrap;
        -webkit-align-items: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-align-content: center;
            -ms-flex-line-pack: center;
                align-content: center;
        -ms-flex-pack: distribute;
            justify-content: space-around;

        -webkit-justify-content: space-around;
        -webkit-flex-flow: row nowrap;
        -webkit-align-items: center;
        -webkit-align-content: center;

        list-style-type: none;
        line-height: 35px;
        border-bottom: 1px solid whitesmoke;
        font-size: 14px;
        font-weight: bold;
        width: 100%;
    }
    
    
    .tabs_title>li {
      min-width: 100px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;

    }*/
    
    .nav_active {
      color: darkorange;
    }

    
    #tabs_line {
      height: 3px;
      margin: 0px 10px;
      margin-top: 2px;
      background-color: darkorange;
      transition: transform .3s ease;
      -moz-transition: transform .3s ease;/* Firefox 4 */
      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
      -o-transition: transform .3s ease; /* Opera */
      width: 0px;
      float: left;
    }

    .tab-content{
        overflow: hidden;
        /*-webkit-overflow-scrolling: touch;*/
        /*display: flex;*/
        height: 100%;
        /*flex-flow:row nowrap;*/
    }
</style>