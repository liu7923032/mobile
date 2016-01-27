<template>
 
  <section class="tabs" v-touch:swipeleft="swipeLeft" v-touch:swiperight="swipeRight" role="tablist">
    <div class="nav-tabs">
        <ul class="tabs_title">
            <li v-for="item in tabItems"
            :class="{'nav_active':activeIndex===$index}" 
            v-touch:tap="switchTab($index)" 
             >{{item.header}}</li>
        </ul>
        <div id="tabs_line" v-bind:style="{ width:underline+ 'px' }">
        </div>
    </div>
      <!-- Tab panes -->
    <div class="tab-content">
        <slot></slot>
    </div>
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
        display: flex;
        flex-flow:column nowrap;
        min-height: 35px;
        justify-content:flex-start;
        height: 100%;
    }

    .nav-tabs{
       display: flex;
       flex-flow:column nowrap;
       min-height: 35px;
       height: 40px;
       justify-content:flex-start;
       flex:0 1 auto;
    }
    
    .tabs_title {
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
      width: 100%;
      min-width: 100px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
    }
    
    .nav_active {
      color: darkorange;
    }

    
    #tabs_line {
      height: 3px;
      margin: 0px 10px;
      margin-top: -3px;
      background-color: darkorange;
      transition: transform .3s ease;
      -moz-transition: transform .3s ease;/* Firefox 4 */
      -webkit-transition: transform .3s ease; /* Safari 和 Chrome */
      -o-transition: transform .3s ease; /* Opera */
      width: 0px;
    }

    .tab-content{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        margin-bottom: 0px;
        height: 100%;
        flex-flow:column nowrap;
    }
</style>