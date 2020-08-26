<template>
  <div id="add">
      <h2>请假条</h2>
    <form>
        <label>请假人</label>
        <input type="text" v-model="noteMessage.name" /><br>
        <label>请假部门</label>
        <input type="text" v-model="noteMessage.job"/><br>
        <label>请假区间</label>
        <input type="text" class="time" v-model="noteMessage.stime"/>
        <font-awesome-icon icon="calendar-check" size="1.9x" class="calendar-check" @click="showCalendar(1)"/>
        <div v-if="calendar"  class="calendar" >
            <calendar  @calendarMes1="Getcalendar" :message1="time1"></calendar>
        </div>
        -----
        <input type="text" class="time" v-model="noteMessage.etime"/>
        <font-awesome-icon icon="calendar-check" size="1.9x" class="calendar-check" @click="showCalendar(2)"/>
        <div v-if="calendar"  class="calendar" >
            <calendar  @calendarMes2="Getcalendar" :message2="time2"></calendar>
        </div>
        <br>
        <label>请假原因</label>
        <textarea v-model="noteMessage.reason" ></textarea><br>
        <button type="submit" @click.prevent="addNote" class="addNote">提交</button>
        
    </form>
  </div>
</template>

<script>
    import calendar from '../components/calendar'
    import axios from "axios"
    import {mapState} from 'vuex';
    
    export default{
        name:"addnote",
        components:{calendar},
        computed:{
           ...mapState(['Authorization']),
        },
        data(){
            return{
                noteMessage:{
                   name:"",
                   job:"",
                   stime:"",
                   etime:"",
                   reason:"",
                   result:"",
                   left:"",
                },
                calendar:false,
                time1:0,
                time2:0,
                getCalendar:{
                    year:"",
                    month:"",
                    day:"",
                    false:"",
                }
            }
        },
        methods: {
            addNote(){
                var obj=JSON.parse(sessionStorage.getItem('User'));
                var noteMessage=this.noteMessage
               console.log(obj.token);
                axios.post("/api/demo/install", noteMessage,
                {headers:{BearerToken:obj.token,'Authorization':obj.token}}).then(resp => {
                    console.log(resp);
                    if (resp.status == "1") {
                        alert('提交成功');
                    } else  {
                        alert(resp.data.data);
                    }
                }).catch(error => {
                alert('未知错误');
                console.log(obj.token);
                console.log(error);
                
            });
            },
            
            showCalendar(num){
                this.calendar=true;
                if(num==1){
                    this.time1=1;
                }
                else if(num==2){
                    this.time2=1;
                }
            },
            Getcalendar(datas){
                this.getCalendar=datas;
               console.log(this.getCalendar);
               
                console.log(this.calendar);
                if(this.time1==1){
                    this.noteMessage.stime=this.getCalendar.year+'-'+this.getCalendar.month+'-'+this.getCalendar.day;
                    this.calendar=this.getCalendar.false;
                }
                else if(this.time2==1){
                    this.noteMessage.etime=this.getCalendar.year+'-'+this.getCalendar.month+'-'+this.getCalendar.day;
                    this.calendar=this.getCalendar.false;
                }
                
            }
        }
    }
</script>
<style scoped>
 #add {
    min-height: 400px;
    margin: 40px auto;
}
input {
    border: solid 1px rgba(0, 0, 0, 0.322);
    
}
input:hover{
    border: blueviolet 1px solid;
}
.time {
    width: 10%;
}
.calendar-check {
    position: relative;
    right: 20px;
    cursor: pointer;
}
.calendar {
    border: 1px solid darkgray;
    width:25%;
    position: absolute;
    z-index: 100;
    background-color:white;
    box-shadow:0 0 7px rgba(0, 0, 0, 0.39);
    left: 50%;
    right: 50%;
    transform: translate(-50%,-50%);
    bottom:20px;
}
button {
    background-color: #1890ff;
    color: white;
    border: none;
    font-size: 20px;
    border-radius: 10px;
}
textarea {
    width: 70%;
    margin-top: 40px;
    border: solid 1px rgba(0, 0, 0, 0.322);
    
}
.addNote {
    margin-top: 80px;
    width: 70%;
    line-height: 40px;
}

</style>
