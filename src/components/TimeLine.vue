<template>
  <div id="time-line">
    <div class="item" v-for="(item,index) in noteTime" :key="index" >
      <div class="item-index" v-if="(index=='0')">{{ item }}</div>
      <div class="item-content" v-if="(index=='0')">审核中</div>
      <div class="item-index">{{item.updated_at}}</div>
      <div class="item-content">{{item.result}}</div>
    </div>
    <div class="note">
      <h2>请假条</h2>
        <form>
            <label>请假人</label>
            <input type="text" v-model="noteMessage[0].name" /><br>
            <label>请假部门</label>
            <input type="text" v-model="noteMessage[0].job" /><br>
            <label>请假区间</label>
            <input type="text" class="time" v-model="noteMessage[0].stime" />
            -----
            <input type="text" class="time" v-model="noteMessage[0].etime" />
            <br>
            <label>请假原因</label>
            <textarea v-model="noteMessage[0].reason"></textarea><br>
            <label>审核留言</label>
            <textarea v-model="noteMessage[0].left"></textarea><br>
           <img src="../assets/pass.png" v-if="noteMessage[0].result=='审核通过'" alt="审核通过" width="80px"/>
           <img src="../assets/check.png" v-if="noteMessage[0].result=='审核中'" alt="审核中" width="80px"/>
           <img src="../assets/fail.png" v-if="noteMessage[0].result=='审核未通过'" alt="审核中" width="80px"/>
        </form>      
    </div>
  </div>
</template>
<script>
export default {
  name: "TimeLine",
  props: {
    noteid:Number,
    items: Array,
    callBack: Function /*父组件传入*/
  },
  data() {
    return {
      noteTime:[],
      noteMessage:[],
    }
  },
  watch:{
        id(old,newvalue) {
            this.noteid=newvalue;
              },
    
        },
  methods: {
    timeLine(){
      console.log(this.noteid);
      console.log(this.items);
      for(var i=0;i<this.items.length;i++){
        if(this.items[i].id==this.noteid){
          //this.noteTime=this.items[i];
          this.$set(this.noteTime, 0, this.items[i].created_at);//可以相应到页面
          this.$set(this.noteTime, 1, this.items[i]);//可以相应到页面
          this.$set(this.noteMessage, 0, this.items[i]);//可以相应到页面
        }
      }
      console.log(this.noteTime);
    },

  },
 
      
}
</script>
<style scoped>
#time-line {
  width: 90%;
}
.item {
   /*用左边margin显示时间线*/
  width: 40%; /*因为左边部分用于显示时间线，所以右边部分减去30px*/
  height: auto; /*高度由内容决定*/
  position: relative;
  margin-bottom: 50px;
  left: 10%;
  cursor: pointer;
  text-align: left;
  font-size: 20px;
}
.item::before {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 100%;
  background-color: #91c2fc;
  position: absolute;
  left: -15px;
}
.item::after {
    content: "";
    width: 3px;
    height: calc(100% + 50px); /*加上10px是item底部的margin*/
    background-color: #91c2fc;
    position: absolute;
    top: 0;
    left: -11px;
}
.item-index {
  line-height: 12px;
  font-size: 12px;
  position: relative;
  color: #656565;
}
.item-content {
  width: 100%;
  height: auto; /*由内容决定*/
  position: relative;
  white-space: pre-wrap; /*保留空白符序列，但是正常地进行换行*/
  word-wrap: break-word; /*在长单词或 URL 地址内部进行换行*/
}
.item:hover::before {
  transform: scale3d(1.2, 1.2, 1);
  background-color: #569ffb;
}

.item:hover::after {
  transform: scale3d(1.1, 1, 1);
  background-color: #569ffb;
}

.item:hover .item-index{
  transform: scale3d(1.01, 1.01, 1);
  color: #343434;
}
.note {
  width: 80%;
  min-height: 500px;
  border: rgba(119, 114, 114, 0.767) 1px solid;
  box-shadow: 0 0 7px rgba(129, 125, 125, 0.753);
  border-radius: 10px;
  margin-bottom: 100px;
  margin-top: 100px;
}
.time {
        width: 15%;
 }
form {
  position: relative;
  
}
textarea {
    width: 70%;
    margin-top: 40px;
    border: solid 1px rgba(0, 0, 0, 0.322);
}
img {
  position: absolute;
  z-index:100;
  top: 60%;
}  
 
</style>