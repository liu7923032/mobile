<template>
    <section class="datepicker">
      <ul class="datepicker-year">
          <li v-for="yItem in yearRange"  :class="[ isShowItem('Y',yItem)? 'dp-show':'dp-hidden' ]">
            <span>{{yItem}}</span>
          </li>
      </ul>
      <ul class="datepicker-month">
          <li v-for="mItem in monthRange" :class="[ isShowItem('M',mItem)? 'dp-show':'dp-hidden' ]">
            <span>{{mItem}}</span>
          </li>
      </ul>
      <ul class="datepicker-day">
          <li v-for="dItem in dayRange"   :class="[ isShowItem('D',dItem)? 'dp-show':'dp-hidden' ]">
            <span>{{dItem}}</span>
          </li>
      </ul>

    <!--   <ul class="datepicker-hour">
          <li v-for="item in hourRange">{{item}}</li>
      </ul>
      <ul class="datepicker-min">
          <li v-for="item in minRange">{{item}}</li>
      </ul>
      <ul class="datepicker-sec">
          <li v-for="item in secRange">{{item}}</li>
      </ul> -->
    </section> 
</template>

<script lang="babel">
    export default {
        created(){
            //初始化数据
            var date='';
            if(this.curdate.length>0){
              date=new Date(this.curdate);
            }else{
              date=new Date();
            }
            this.curYear=date.getFullYear();
            this.curMonth=date.getMonth()+1;
            this.curDay=date.getDate();
            //初始化年份
            this.yearRange=this.getYearRange(this.curYear);
            //初始化天数
            this.dayRange=this.getDayRange(this.curYear,this.curMonth);

            this.yHeight=40*this.yearRange.length;
            this.mHeight=40*this.monthRange.length;
            this.dHeight=40*this.dayRange.length;
            

            //初始化显示的数据
            this.showDays=this.getShowRange(this.curDay,'D');
            this.showYears=this.getShowRange(this.curYear,'Y');
            this.showMonths=this.getShowRange(this.curMonth,'M');
            console.log(this.showYears);
            console.log(this.showMonths);
            console.log(this.showDays);


        },
        props:{
          curdate:{
            type:String,
            default:''
          }
        },
        data(){
            return {
              yearRange:[],
              monthRange:[ 
                           1,2,3,4,5,6,7,8,9,10,11,12
                         ],
              dayRange:[],
              hourRange:[],
              minRange:[],
              secRange:[],
              curYear:0,
              curMonth:0,
              curDay:0,
              curHour:0,
              curMin:0,
              curSec:0,
              showYears:[],
              showMonths:[],
              showDays:[],
              yHeight:0,
              mHeight:0,
              dHeight:0
            }
        },
        methods:{
            //显示该item是否显示 
            isShowItem(flag,item){
             
              var tempItem=parseInt(item);
                switch(flag){
                  case "Y":
                      return tempItem>=this.showYears[0]&&tempItem<=this.showYears[this.showYears.length-1];
                  case "M":
                      return tempItem>=this.showMonths[0]&&tempItem<=this.showMonths[this.showMonths.length-1];
                  case "D":
                      return tempItem>=this.showDays[0]&&tempItem<=this.showDays[this.showDays.length-1];
                } 
                return false;
            },
             //通过年月来获取月份的天数
            dayNumOfMonth:function(year,month){
                var d = new Date(year,month,0);
                return d.getDate();
            },
            //通过年份来获取年份的区间
            getYearRange:function(year){
              var tempYR=[];
              for (var i = year- 10; i <=year+5; i++) {
                  tempYR.push(i);
              }          
              return tempYR;
            },
            getDayRange:function(year,month){
               var tempDR=[];
               var length=this.dayNumOfMonth(year,month);
               for (var i = 1; i <=length; i++) {
                  tempDR.push(i);
               };
               return tempDR;
            },
            //获取显示的数据
            getShowRange(val,flag){
              var tempSR=[];
              var start=1,end=0;
              start=val-2;
              end=val+2;
              for (var i = start; i <=end; i++) {
                 switch(flag){
                  case "Y":
                    if(this.yearRange.indexOf(i)>=0){
                        tempSR.push(i);
                    }
                    break;
                  case "M":
                    if(this.monthRange.indexOf(i)>=0){
                       tempSR.push(i);
                    }
                    break;

                  case "D":
                    if(this.dayRange.indexOf(i)>=0){
                       tempSR.push(i);
                    }
                    break;
                  }
              };
              return tempSR;
            }
        }
    }
</script>

<style type="text/css">
    .datepicker{
        background-color: whitesmoke;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-flow:row nowrap;
            -ms-flex-flow:row nowrap;
                flex-flow:row nowrap;
        justify-content: space-around;
        height: 200px;
        width: 300px;
        font-size: 20px;
        padding: 20px 0px;
        overflow: hidden;
        align-items:center;
        border:1px solid red;
    }

    .datepicker>ul{
      list-style-type: none;
    }

    /*.datepicker-month{
        transform:translate3d(0px, 120px, 0px);
    }*/


    ul>li{
      line-height: 40px;
      vertical-align: middle;
      height: 30px;
      padding: 5px;
      text-align: center;
      color: black;
      transition:opacity .2s ease-out;
    }
    
    .dp-hidden{
      opacity: 0;
    }
    .dp-show{
      opacity: 1;
    }
    
    li.select{
      color: black;
      font-weight: bold;
      border-top: 2px solid green;
    }
</style>