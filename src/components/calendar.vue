<template>
    <div id="calender" v-if="calendar">
        <div class="txt-c p-10">
            <span @click="prev" class="key"> ⬅️ </span>
            <input type="text" v-model="year">年
            <input type="text" v-model="month" class="month">月
            <span @click="next" class="key"> ➡️️️️ </span>
        </div>
        <div class="weekDay flex jc-sb p-5 day" >
            <p v-for="item in weekList" :key="item.id">{{item}}</p>
        </div>
        <div class="weekDay flex p-5 day">
            <p v-for="item in spaceDay" :key="item.id"></p>
            <p v-for="(item,idx) in (monthDay[this.month-1] || 30)" @click="setDay(idx)" :class="idx==activeDay?'active':''" :key="item.id">{{item}}</p>
        </div>
        <button type="submit" class="okCalendar" @click="cancleCalendar">ok</button>
    </div>
</template>

<script>
    export default {
        name: "calender",
        props:['message1','message2'],
        
        data(){
            return{
                year: '', // 年份
                month: '', // 月份
                day: '', // 天数
                current: '', // 当前时间
                weekList:['周一','周二','周三','周四','周五','周六','周日'],
                monthDay:[31,'',31,30,31,30,31,31,30,31,30,31],
                activeDay: '', // 选中的日期
                spaceDay: '', // 每个月第一天是星期几
                February:'', // 判断2月份的天数
                calendar:true,
            }
        },
        created(){
            this.current = new Date()
            this.getTheCurrentDate()
            this.getMonthFisrtDay()
            this.February = this.isLeapYear(this.year) ? 28 : 29
            this.monthDay.splice(1,1,this.February)
        },
        watch:{
          month(){
              if(this.month>12||this.month<1){
                  console.log('请输入正确月份')
                  return
              }
              this.getMonthFisrtDay()
          },
          year(){
              this.getMonthFisrtDay()
          }
        },
        methods:{
            // 判断是否是闰年
            isLeapYear(year){
                return year % 4 == 0
            },
            // 选取特定天数
            setDay(idx){
                this.activeDay = idx
                this.day = idx + 1
                console.log('选择的日期是'+this.year+'-'+this.month+'-'+this.day)
                //console.log(this.message1);
                //console.log(this.message2);
                
            },
            // 判断月份的第一天是星期几
            getMonthFisrtDay(){
                var firstDayOfCurrentMonth = new Date(this.year,this.month-1,1) // 某年某月的第一天
                if(firstDayOfCurrentMonth.getDay() == 0){
                    this.spaceDay = 6
                } else {
                    this.spaceDay = firstDayOfCurrentMonth.getDay() - 1
                }
            },
            // 获取当前的日期
            getTheCurrentDate(){
                this.year = this.current.getFullYear()
                this.month = this.current.getMonth() + 1
                this.day = this.current.getDate()
            },
            prev(){
                if(this.month==1){
                    this.year--
                    this.month=12
                }else{
                    this.month--
                }
                this.activeDay = 0
                this.getMonthFisrtDay()
            },
            next(){
                if(this.month==12){
                    this.year++
                    this.month=1
                }else{
                    this.month++
                }
                this.activeDay = 0
                this.getMonthFisrtDay()
            },
            cancleCalendar(){
                var sendCalendar={
                  year:this.year,
                  month:this.month,
                  day:this.day,
                  false:false
                };
                
                if(this.message2==0){
                  this.$emit('calendarMes1',sendCalendar);
                  console.log(sendCalendar);
                  
                }
                if(this.message2==1) {
                  this.$emit('calendarMes2',sendCalendar);
                  console.log(sendCalendar);
                  
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
#calender{
  width:90%;
    .txt-c{
        text-align: center;
    }
    .p-10{
        padding: 10px;
    }
    .p-5{
        padding: 10px;
    }
    .flex {
        display: flex;
    }
    .key {
      cursor: pointer;
    }
    .jc-sb{
        justify-content: space-between;
    }
    input{
        width: 50px;
        &.month{
            width: 50px;
        }
    }
    .day{
        flex-wrap: wrap;
        p{
            width: 14.28%;
            /*flex: 0 0 0 ;*/
            text-align: center;
            line-height: 30px;
            height: 30px;
            position: relative;
            z-index: 100;
            &.active{
                color: #fff;
            }
            &.active:before{
                content: '';
                height: 2rem;
                width: 2rem;
                position: absolute;
                z-index: -1;
                left: 0;
                top: 0;
                transform: translateX(50%);
                border-radius: 50%;
                background: #188fffa1;
                color: #fff;
            }
        }
    }
    .okCalendar {
    width: 25%;
    }
    button {
    background-color: #1890ff;
    color: white;
    border: none;
    font-size: 20px;
    border-radius: 10px;
}
}
</style>
