<template>

  <div class="datepicker">
      <section class="datepicker-header">
        <div>年</div>
        <div>月</div>
        <div>日</div>
      </section>
      <section class="datepicker-body">
          <div class="column datepicker-year">
              <span class="datepicker-icon" @click="add('Y')"><i class="icon-plus"></i></span>
              <span class="datepicker-value">{{curYear}}</span>
              <span class="datepicker-icon" @click="minus('Y')"><i class="icon-minus"></i></span>
          </div>
          <div class="column datepicker-month">
              <span  class="datepicker-icon" @click="add('M')"><i class="icon-plus"></i></span>
              <span class="datepicker-value">{{curMonth<10?("0"+curMonth):curMonth}}</span>
              <span  class="datepicker-icon" @click="minus('M')"><i class="icon-minus"></i></span>
          </div>
          <div class="column datepicker-day">
              <span  class="datepicker-icon" @click="add('D')"><i class="icon-plus"></i></span>
              <span class="datepicker-value">{{curDay<10?("0"+curDay):curDay}}</span>
              <span  class="datepicker-icon" @click="minus('D')"><i class="icon-minus"></i></span>
          </div>
      </section> 
  </div>
    

    <!--   <ul class="datepicker-hour">
          <li v-for="item in hourRange">{{item}}</li>
      </ul>
      <ul class="datepicker-min">
          <li v-for="item in minRange">{{item}}</li>
      </ul>
      <ul class="datepicker-sec">
          <li v-for="item in secRange">{{item}}</li>
      </ul> -->
    
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
              curSec:0
            }
        },
        methods:{
            add(flag){
             //通过年月来获取月份的天数
                switch(flag){
                  case "Y":
                    this.curYear=this.curYear+1;
                    break;
                  case "M":
                    //1:判断月份所在的index
                      var index=this.curMonth==12?0:this.curMonth;
                      this.curMonth=this.monthRange[index];
                      this.dayRange=this.getDayRange(this.curYear,this.curMonth);
                    break;
                  case "D":
                      var length=this.dayRange.length;
                      var dayIndex=this.curDay==length?0:this.curDay;
                      this.curDay=this.dayRange[dayIndex];
                    break;
                }
            },
            minus(flag){
                 switch(flag){
                    case "Y":
                      this.curYear=this.curYear-1;
                      break;
                    case "M":
                      var index=this.curMonth==1?11:this.curMonth-2;
                      this.curMonth=this.monthRange[index];
                      this.dayRange=this.getDayRange(this.curYear,this.curMonth);
                      break;
                    case "D":
                        var length=this.dayRange.length;
                        var dayIndex=this.curDay==1?length-1:this.curDay-2;
                        this.curDay=this.dayRange[dayIndex];
                      break;
                  }
            },
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

<style type="text/css" scoped>

        .datepicker{
            display: flex;
            flex-flow:column nowrap;
        }

      .datepicker-header{
          background-color: whitesmoke;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-flow:row nowrap;
              -ms-flex-flow:row nowrap;
                  flex-flow:row nowrap;
          justify-content: space-around;
          height: 30px;
          width: 300px;
          font-size: 20px;
          padding: 5px 20px 0px 20px;
          align-items:center;
          border-radius: 5px;
          font-weight: bold;
      }

      .datepicker-body{
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
          padding: 5px 20px;
          overflow: hidden;
          align-items:center;
          border-radius: 5px;
      }


      .datepicker-body>.column{
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-flow:column nowrap;
          -ms-flex-flow:column nowrap;
                  flex-flow:column nowrap;
          -webkit-justify-content:center;
          -ms-flex-pack:center;
                  justify-content:center;
          -webkit-align-items:space-around;
          -ms-flex-align:space-around;
                  align-items:space-around;
                  padding: 5px;

      }

      .column>span{
        padding: 10px;
        width: 60px;
        text-align: center;
        vertical-align: middle;
        background-color: white;    
      }
  

      .column>span:active{
             background-color: darkorange;
      }

      .column>span:nth-child(1){
         border-radius: 5px 5px 0px 0px;
         box-shadow: 0px 0px 3px gray;
      }

      .column>span:nth-child(3){
         border-radius: 0px 0px 5px 5px;
         box-shadow: 0px 0px 3px gray;
      }

     .datepicker-icon{
          border: 2px solid gray;
          height: 30px;
          line-height: 30px;
          font-size: 24px;
     }

    
    .datepicker-value{
        height: 50px;
        border-left: 2px solid gray;
        border-right: 2px solid gray;
        line-height: 50px;
           font-size: 30px;
        font-weight: bold;
    }
    
    
</style>