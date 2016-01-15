<template>
    <div class="calendar">
        <div class="calenarDayView" v-show="showDay">
            <div class="calendar-header">
                <div class="calendar-title">
                    <div>
                        <span class="icon-double-angle-left" @click="yearClick(0)"></span>
                        <span class="icon-angle-left" style='margin-left:20px;width:50px;' @click="monthClick(0)"></span>
                    </div>
                    <p>
                        <span @click="showYearView">{{curYear}}年</span>
                        <span @click="showMonthView">{{curMonth}}月</span>
                    </p>
                    <div>
                         <span class="icon-angle-right" style='margin-right:20px;' @click="monthClick(1)"></span>
                         <span class="icon-double-angle-right" @click="yearClick(1)"></span>
                    </div>
                </div>
                <div class="calendarDay-week">
                    <ul>
                        <li v-for="(index,item) in weekRange" :class="{'restDay':index==5||index==6}">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="calendar-range">
                <ul>
                    <li v-for="item in dateRange" class="calendarDay"   v-on:click="selectDay(item.day)">
                        <span v-bind:class="{'itemSelect':isCurSelect('D',item.day),'restDay':item.isRestDay,'curMonth':item.isCur}">{{item.day}}</span>
                    </li>
                </ul>
            </div>
            <div class="calendarDay-footer">
                <span @click="today">今天</span>
            </div>
        </div>
        <div class="calendarMonthView" v-show="showMonth">
            <div class="calendar-header">
                <div class="calendar-title">
                    <div>
                        <span class="icon-double-angle-left" @click="yearClick(0)"></span>
                    </div>
                    <p>
                        <span @click="showYearView">{{curYear}}年</span>
                    </p>
                    <div>
                         <span class="icon-double-angle-right" @click="yearClick(1)"></span>
                    </div>
                </div>
            </div>
            <div class="calendar-range">
                <ul>
                    <li v-for="item in monthRange" class="calendarMonth"   v-on:click="selectMonth(item.id)">
                        <span v-bind:class="{'itemSelect':isCurSelect('M',item.id)}">{{item.text}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="calendarYearView" v-show="showYear">
            <div class="calendar-header">
                <div class="calendar-title">
                    <div>
                        <span class="icon-double-angle-left" @click="yearClick(0)"></span>
                    </div>
                    <p>
                        <span @click="showYearView">{{yearTitle}}</span>
                    </p>
                    <div>
                         <span class="icon-double-angle-right" @click="yearClick(1)"></span>
                    </div>
                </div>
            </div>
            <div class="calendar-range">
                <ul>
                    <li v-for="item in yearRange" class="calendarMonth"   v-on:click="selectYear(item)">
                        <span v-bind:class="{'itemSelect':isCurSelect('Y',item)}">{{item}}</span>
                    </li>
                </ul>
            </div>
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
               weekRange:['一','二','三','四','五','六','日'],
               monthRange:[
                           {id:1,text:'一月'},{id:2,text:'二月'},{id:3,text:'三月'},{id:4,text:'四月'},
                           {id:5,text:'五月'},{id:6,text:'六月'},{id:7,text:'七月'},{id:8,text:'八月'},
                           {id:9,text:'九月'},{id:10,text:'十月'},{id:11,text:'十一月'},{id:12,text:'十二月'}
                          ],
               dateRange:[],
               yearRange:[],
               yearTitle:''
            }
        },
        props:{
            width:{

            },
            //格式
            format:{
                type:String,
                default:"DD"//YYYY,MM,DD,H,M,S
            },
            curdate:{
                type:String,
                default:''
            }
        },
        created:function(){
            var date='';
            if(this.curdate.length>0){
                date=new Date(this.curdate);
            }else{
                date=new Date();
            }
            //初始化当前的年和月,并加载当前年月的数据
            this.curYear=date.getFullYear();
            this.curMonth=date.getMonth()+1;
            this.curDay=date.getDate();

            this.dateRange=this.getDateRange(this.curYear,this.curMonth);
            this.yearRange=this.getYearRange(this.curYear);
            this.yearTitle=this.yearRange[0]+"~"+this.yearRange[11];
            //通过格式化显示页面
            this.initShowView();
        },
        methods:{
            initShowView(){
                switch(this.format){
                    case "YYYY":
                        this.showYear=true;
                        this.showMonth=false;
                        this.showDay=false;
                        break;
                    case "MM":
                        this.showYear=false;
                        this.showMonth=true;
                        this.showDay=false;
                        break;
                    case "DD":
                        this.showYear=false;
                        this.showMonth=false;
                        this.showDay=true;
                        break;
                }
            },
            isCurSelect(flag,item){
                var date=new Date();
                const tempY=date.getFullYear();
                const tempM=date.getMonth()+1;
                if(flag=="D"){
                    return this.curYear==tempY&&this.curMonth==tempM&&this.curDay==item;
                }else if(flag=="M"){
                    return tempM==item;
                }else{
                    return tempY==item;
                }
            },
            showYearView(){
                this.showYear=true
                this.showMonth=false;
                this.showDay=false;
            },
            showMonthView(){
                this.showYear=false
                this.showMonth=true;
                this.showDay=false;
            },
            selectYear:function(year){
                this.curYear=year;
                this.showYear=false
                this.showMonth=true;
                this.showDay=false;
                if(this.format=="YYYY"){
                    this.$dispatch('itemClick',year);
                }
            },
            selectMonth(month){
                this.showYear=false
                this.showMonth=false;
                this.showDay=true;
                this.curMonth=month;
                this.dateRange=this.getDateRange(this.curYear,this.curMonth);
                if(this.format=="MM"){
                    this.$dispatch('itemClick',this.curYear+"-"+month);
                }
            },
            //选择天的时候
            selectDay:function(day){
                const tempD=this.curYear+"-"+this.curMonth+"-"+day;
                console.log("触发派发事件："+tempD);
                this.$dispatch('item-click',tempD);
            },
            today:function(){
                var newDate=new Date();
                this.curYear=newDate.getFullYear();
                this.curMonth=newDate.getMonth()+1;
                this.dateRange=this.getDateRange(this.curYear,this.curMonth);
            },
            //下一年或下一个月
            yearClick(flag){
                if(this.showYear){
                    //如果是年的视图的情况
                    const year=flag==0?this.curYear-10:this.curYear+10;
                    this.yearRange=this.getYearRange(year);
                    this.yearTitle=this.yearRange[0]+"~"+this.yearRange[11];    
                }else{
                     const year=flag==0?this.curYear-1:this.curYear+1;
                     this.curYear=year;
                     this.dateRange=this.getDateRange(year,this.curMonth);
                }
              
            },
            monthClick(flag){
                var tempM=this.curMonth;
                var tempY=this.curYear;
                //上一月
                if(flag==0){//
                    if(tempM==1){
                        tempM=12;
                        tempY=this.curYear-1;
                    }else{
                        tempM=tempM-1;
                    }
                }else{//下个月
                    if(tempM==12){
                        tempY=this.curYear+1;
                        tempM=1;
                    }else{
                        tempM=tempM+1;
                    }
                }
                this.curYear=tempY;
                this.curMonth=tempM;
                console.log(tempY,tempM);
                 this.dateRange=this.getDateRange(tempY,tempM);
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
                            var week=new Date(this.curYear+"/"+(this.curMonth-1)+"/"+pi).getDay();
                            var restDay=(week==6||week==0);
                            datearray.push({
                                isCur:false,
                                day:pi,
                                isRestDay:restDay
                            });
                     }
                }
                //3:得到这个月的总天数
                var curDays=this.dayNumOfMonth(year,month);
                for(var i=1;i<=curDays;i++){
                    var week=new Date(this.curYear+"/"+this.curMonth+"/"+i).getDay();
                    var restDay=(week==6||week==0);
                    datearray.push({
                        isCur:true,
                        day:i,
                        isRestDay:restDay
                    });
                }
                //2:检查该对象里面是否包含42个值,如果不包含,那么久生成
                if(datearray.length<42){
                    var nextValue=42-datearray.length;
                     for(var ni=1;ni<=nextValue;ni++){
                        var week=new Date(this.curYear+"/"+(this.curMonth+1)+"/"+ni).getDay();
                        var restDay=(week==6||week==0);
                        datearray.push({
                                isCur:false,
                                day:ni,
                                isRestDay:restDay
                        });
                     }
                }
                return datearray;
            },
            getYearRange:function(year){
                var tempYRange=[];
                for (var i = year - 6; i <=year+5; i++) {
                   tempYRange.push(i);   
                };
                return tempYRange;
            }
        }
    }

</script>

<style>
        .calendar {
            width: 100%;
            height: auto;
            display: -ms-flexbox;
            display: flex;
            display: -webkit-flex;
            -webkit-flex-flow: column nowrap;
                -ms-flex-flow: column nowrap;
                    flex-flow: column nowrap;
            -webkit-justify-content: flex-start;
                -ms-flex-pack: start;
                    justify-content: flex-start;
            box-shadow: 4px 4px 5px gray;
            border: 0px solid whitesmoke;
            color: #666;
            font-size: 14px;

        }
        
        .calendar span {
            cursor: pointer;
        }
        
        .calendar-header {
            height: auto;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: column nowrap;
                -ms-flex-flow: column nowrap;
                    flex-flow: column nowrap;
            -webkit-justify-content: center;
                -ms-flex-pack: center;
                    justify-content: center;
            border-bottom: 1px solid lightgrey;

        }
        
        .calendar-title {
            height: 30px;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            padding: 5px 15px;
            -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                    flex-flow: row nowrap;
            -webkit-justify-content: space-between;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;
            border-bottom: 1px solid lightgrey;
            font-weight: bold;
        }
        
        .calendarDay-title>span:active {
            color: #2db7f5;
        }
        
        .calendarDay-week{
            background-color: whitesmoke;
        }
        
        .calendarDay-week>ul {
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                    flex-flow: row nowrap;
            -webkit-justify-content: space-around;
                -ms-flex-pack: distribute;
                    justify-content: space-around;
            height: 30px;
             padding: 5px 0px;
            list-style-type: none;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;
            margin: 0px;
        }
        

        .calendarDay-week>ul>li {
            -webkit-flex-basis: 14%;
                -ms-flex-preferred-size: 14%;
                    flex-basis: 14%;
            text-align: center;
        }
       

        .calendar-range {
            height: 260px;
        }


        
        .calendar-range>ul {
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
                -ms-flex-flow: row wrap;
                    flex-flow: row wrap;
            -webkit-justify-content: flex-start;
                -ms-flex-pack: start;
                    justify-content: flex-start;
            padding: 5px 0px;
            list-style-type: none;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;
            margin: 0px;
            font-size: 16px;
        }

         .calendar-range>ul>li>span:hover{
            border:2px solid darkorange;
            color: darkorange;
            border-radius: 4px;
            padding: 5px;
         }

         .calendar-range>ul>li>span:active{
            border:2px solid darkorange;
            color: #2db7f5;
            border-radius: 4px;
            padding: 5px;
         }

        
        .calendarDay {
            -webkit-flex-basis: 14.28%;
                -ms-flex-preferred-size: 14.28%;
                    flex-basis: 14.28%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }

        .calendarMonth{
            -webkit-flex-basis: 30%;
                -ms-flex-preferred-size: 30%;
                    flex-basis: 30%;
            height: 60px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
        }
       
        .itemSelect {
            padding: 5px;
            border:2px solid #2db7f5;
            color: #2db7f5;
            border-radius: 4px;
        }
        .restDay{
            color: #e02d2d;
        }
       

        .curMonth{
            font-weight: bold;
        }
        
        .calendarDay-footer {
            height: 30px;
            padding: 5px 15px;
            -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                    flex-flow: row nowrap;
            border-top: 1px solid lightgray;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                    flex-flow: row nowrap;
            -webkit-justify-content: center;
                -ms-flex-pack: center;
                    justify-content: center;
            -webkit-align-items: center;
                -ms-flex-align: center;
                    align-items: center;
            font-weight: bold;
             background-color: whitesmoke;
        }
</style>
   
