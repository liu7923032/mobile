<template>
 
  <div class="page-content" v-touch:swipe="swipeTab" role="tablist">
    <ul class="nav-tabs">
        <li v-for="item in tabItems"
        :class="{'nav_active':activeIndex===$index}" 
        v-touch:tap="switchTab($index)" 
         >{{item.header}}</li>
    </ul>
    <div class="tabs_line" v-bind:style="{ width:underline+ 'px' }"></div>
    
      <!-- Tab panes -->
     <div class="tab-content" v-el:tabContent>
        <slot></slot>
     </div>
  </div>
</template>

<script>
  export default {
    ready(){
        var width=  document.body.offsetWidth-20;
        this.underline=width/this.tabItems.length;
        var leftWidth=this.activeIndex*this.underline;
        document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+leftWidth+"px)";
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
        document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+leftWidth+"px)";
      },
      swipeTab(e){
        var deltaX=e.deltaX;
        var tempIndex=this.activeIndex;
        if(deltaX>0){
          var tempIndex=this.activeIndex-1;
          if(tempIndex<0){
            tempIndex=0;
          }
        }else{
          var tabLength=this.tabItems.length-1;
          if(tempIndex==tabLength){
            tempIndex=tabLength;
          }else{
            tempIndex=this.activeIndex+1;
          }
        }
        this.activeIndex=tempIndex;
        this.switchTab(tempIndex);
        // document.querySelectorAll('.tabs_line')[0].style.transform="translateX("+deltaX+"px)";
      }
    }
  }
</script>


<style type="text/css" scoped>
    
    .nav-tabs {
      margin: 0px;
      padding: 0px;
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
      border-bottom: 2px solid whitesmoke;
      padding: 0 10px;
      
      
      font-size: 14px;
      font-weight: bold;
      -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
              flex-grow: 1;
    }
    
    
    .nav-tabs>li {
      width: 100%;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
    }
    
    .nav_active {
      color: darkorange;
    }

    
    .tabs_line {
      display: -ms-flexbox;
      display: flex;
      display: -webkit-flex;
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
</style>