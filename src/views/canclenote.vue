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
             <th>结果</th>
             <th>选择</th>
           </tr>
           <tr v-for="(item,index) in items" :key="index">
             <th>{{item.name}}</th>
             <th>{{item.job}}</th>
             <th>{{item.stime}}--{{item.etime}}</th>
             <th>{{item.reason}}</th>
             <th>{{item.result}}</th>
             <th><a ><input type="checkbox" @click="sendId(item.id)" class="cancleInput"></a></th>
           </tr>
         </table>
       </div>
       <div>
         <cancleNote :id="this.id" v-if="showCancle"></cancleNote>
       </div>
    </div>
</template>
<script>
    import cancleNote from "../components/cancleNote"
    import axios from "axios";
    var obj=JSON.parse(sessionStorage.getItem('User'));
    export default {
     // name: 'App',
      components: {
        cancleNote
      },
      data() {
        return {
          content:'',
          noteName:'请假人姓名',
          items: [],
          id:'0',
          showTable:false,
          showInput:true,
          showCancle:false,
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
          console.log(this.id);
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
                        this.showCancle=true;
                        if(this.items==''){
                          alert('查无此人');
                          this.showCancle=false;
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
.cancleInput {
  margin:0 auto;
}

</style>
