<template>
    <div>
       <div class="noteName">
         <input type="text" v-model="noteName" @click="displayName" v-if="showInput"/><br>
         <button type="submit" @click.prevent="searchState" v-if="showInput">提交</button>
         <table border="1" v-if="showTable">
           <tr>
             <th>姓名</th>
             <th>部门</th>
             <th>区间</th>
             <th>理由</th>
             <th>进度</th>
           </tr>
           <tr v-for="(item,index) in items" :key="index">
             <th>{{item.name}}</th>
             <th>{{item.job}}</th>
             <th>{{item.stime}}--{{item.etime}}</th>
             <th>{{item.reason}}</th>
             <th><a @click.prevent="sendId(item.id)">查询(有点故障点两次）</a></th>
           </tr>
         </table>
       </div>
       <div id="timeBox">
         <time-line :items="items" :noteid="id" ref="TimeLine" class="time-line"></time-line>
       </div>
    </div>
</template>
<script>
    import TimeLine from "../components/TimeLine";
    import axios from "axios";
    var obj=JSON.parse(sessionStorage.getItem('User'));
    export default {
     // name: 'App',
      components: {
        TimeLine
      },
      data() {
        return {
            timeLineCallBack: function(index, content){
             let  _this=this;   
            _this.content="index:" + index + "\n" + "content:" + content;
            console.info("index:" + index + "\n" + "content:" + content);
             },
          content:'',
          noteName:'请假人姓名',
          items: [],
          id:'',
          showTable:false,
          showInput:true,
        }
      },
      methods:{
        displayName(){
          if(this.noteName=='请假人姓名'){
            this.noteName='';
          }
        },
        sendId(num){
          this.id=num;
          this.$refs.TimeLine.timeLine();
        },
        searchState(){
          axios.get('/api/demo/listnotes',{
                params:{},
                headers:{BearerToken:obj.token,'Authorization':localStorage.getItem('Authorization')},
            }).then(resp => {
                    console.log(resp);
                    if (resp) {
                        //alert('获取成功');
                        var j=0;
                        for(var i=0;i<resp.length;i++){
                          if(resp[i].name==this.noteName){
                             //this.items[j]=resp.data[i];//无法响应到页面
                             this.$set(this.items, j, resp[i]);//可以相应到页面
                            // console.log(this.items);
                             j++;
                          }
                        }
                        if(this.items==''){
                          alert('查无此人');
                        }
                        else{
                          this.showTable=true;
                          this.showInput=false;
                        }
                    } 
                    else if (resp.status == "400") {
                        alert(resp.data.data);
                    }
                }).catch(error => {
                alert('未知错误');
                console.log(error); 
            });
        }
      },
    }
    </script>
<style scoped>
#timeBox {
    width: 90%;
    margin-top: 60px;
}
input {
  font-size: 20px;
}
button {
  width: 70%;
  margin-top: 60px;
  line-height: 40px;
  background-color: rgb(82, 178, 241);
  color: white;
  font-size: 20px;
  border: none;
}
table {
  width: 70%;
}
table a {
  cursor: pointer;
}
.time-line {
    width: 30%;
}
</style>
