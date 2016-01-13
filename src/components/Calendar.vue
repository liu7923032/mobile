<template>
     <div class="calendar">
        <div class="calendar-header">
            <div class="calendar-title">
                <span class="icon-left">-</span>
                <p><span v-on:click="showYear">{{curYear}}年</span><span v-on:click="showMonth">{{curMonth}}月</span></p>
                <span class="icon-right">+</span>
            </div>
            <div class="calendar-week">
                <ul>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                    <li>日</li>
                </ul>
            </div>
        </div>

        <div class="calendar-daterange">
            <ul>
                <li v-for="item in dateRange" class="calendar-day" v-bind:class="{'daySelect':item.day==curDay,'curMonth':item.isCur}"  v-on:click="selectDay(item)">
                    {{item.day}}
                </li>
            </ul>
        </div>
        <div class="calendar-footer">
            <span>今天</span>
        </div>
    </div>
</template>

<script lang="babel">
    
    export default {
        data:function(){
            return {
                   curYear:0,
                   curMonth:0,
                   curDay:0,
                   showDay:true,
                   showYear:false,
                   showMonth:false,
                   dateRange:[]
            }
        },
        created:function(){
            var date=new Date();
            this.curYear=date.getFullYear();
            this.curMonth=date.getMonth()+1;
            this.curDay=date.getDate();
            
            this.dateRange=this.getDateRange(this.curYear,this.curMonth);
        },
        methods:{
            selectDay:function(day){
                alert(day);
            },
            //通过日期来获取当期星期几
            dayOfWeek:function(date){
              var week=new Date(date).getDay();
              if(week==0){
                  return 7;
              }  
              else{
                  return week;
              }
            },
            //通过年月来获取月份的天数
            dayNumOfMonth:function(year,month){
                var d = new Date(year,month,0);
                return d.getDate();
            },
            //加载
            getDateRange:function(year,month){
                var datearray=[];
                var firstDateDay=0;
                //1:得到当前月的第一天是星期几
                var firstDay=year+"-"+month+"-01";
                
                var firstWeek=this.dayOfWeek(firstDay);
                //2:通过星期得到日历的第一天
                if(firstWeek==1){
                    firstDateDay=1;
                }else{
                    //获取上个月的天数
                    var preMonth=0;
                    if(month==1){
                        preMonth=this.dayNumOfMonth(year-1,12);
                    }
                     preMonth=this.dayNumOfMonth(year,month-1);
                     
                     for(var pi=preMonth-firstWeek+2;pi<=preMonth;pi++){
                            datearray.push({
                                isCur:false,
                                day:pi
                            });
                     }
                }
                //3:得到这个月的总天数
                var curDays=this.dayNumOfMonth(year,month);
                for(var i=1;i<=curDays;i++){
                    datearray.push({
                        isCur:true,
                        day:i
                    });
                }
                //2:检查该对象里面是否包含42个值,如果不包含,那么久生成
                if(datearray.length<42){
                    var nextValue=42-datearray.length;
                     for(var ni=1;ni<=nextValue;ni++){
                         datearray.push({
                                isCur:false,
                                day:ni
                            });
                     }
                }
                return datearray;
            }
        }
    }

</script>

<style>
        .calendar {
            width: 100%;
            height: auto;
            display: flex;
            display: -webkit-flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            box-shadow: 4px 4px 5px gray;
            border: 2px solid whitesmoke;
            color: #666;
        }
        
        .calendar span {
            cursor: pointer;
        }
        
        .calendar-header {
            height: auto;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            border-bottom: 1px solid lightgrey;
        }
        
        .calendar-title {
            height: 30px;
            display: flex;
            padding: 5px 15px;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid lightgrey;
            font-weight: bold;
        }
        
        .calendar-title>span:active {
            color: #2db7f5;
        }
        
        .calendar-week{
            background-color: whitesmoke;
        }
        
        .calendar-week>ul {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            height: 30px;
            padding: 0px;
            list-style-type: none;
            align-items: center;
            margin: 5px 0px;
        }
        
        .calendar-daterange {
            height: 260px;
        }
        
        .calendar-daterange>ul {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            height: 30px;
            padding: 5px 0px;
            list-style-type: none;
            align-items: center;
            margin: 0px;
            font-size: 12px;
        }
        
        .calendar-day {
            flex-basis: 14%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }
        
        .daySelect {
            border:1px solid steelblue;
        }
        .curMonth{
            font-weight: bold;
        }
        
        .calendar-footer {
            height: 30px;
            padding: 5px 15px;
            flex-flow: row nowrap;
            border-top: 1px solid lightgray;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            font-weight: bold;
             background-color: whitesmoke;
        }
</style>
   

    <script>
       var vm= new Vue({
            el:'body',
          
        })
    </script>
</body>

</html>