
<template>
    <div id="mainpage">
        <h2 >请假服务</h2>
        <vc-calendar :attributes='attrs'  style="position: absolute;right:10%;top: 40px;"></vc-calendar>
     <div class="header">
        <p v-if="showname" class="hello">你好{{username}}! |<a @click="loginOut">退出登录</a><router-link to="/managePage" v-if="(showManager=='Manager')"> | 管理员界面</router-link></p>
        <div>
           <a @click="login(1)" v-if="showstate" >登录</a>
           <a @click="login(2)" v-if="showstate" >注册</a>
           
        </div>
     </div>
     <div class="list">
       <router-link to="/addnote"><font-awesome-icon icon="comment-dots"  size="1.5x" />请假</router-link> 
       <router-link to="/canclenote"><font-awesome-icon icon="trash-alt"  size="1.5x"  />销假</router-link> 
       <router-link to="/showstate"><font-awesome-icon icon="search"  size="1.5x" />进度查询</router-link> 
      </div>
      <!--登录注册组件-->
      <div class="window" v-show="display">
          <font-awesome-icon icon="times"  size="2x" class="times" @click="cancle"/>
          <login v-show="showLogin" ></login>
          <register v-show="showRegister" ></register>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from "axios"
  import login from '../components/login'
  import register from '../components/register'
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  export default {
      name:"index",
      components:{login,register},
      computed:{
          ...mapGetters(['Authorization','showname','showstate','username','showManager'])
      },
      data(){
          return{
              display:false,
              showLogin:false,
              showRegister:false,
              showname:this.$store.getters.showname,
              showstate:this.$store.getters.showstate,
              username:this.$store.getters.username,
              showManager:this.$store.getters.showManager,
              // 当前日期
              attrs: [
                {
                   key: 'today',
                   // 括号内传递日期可点亮指定日期，如new Date(2019, 6, 1)，也可传递多个日期：如dates: [ new Date(2018, 0, 1), new Date(2018, 0, 15) ]
                   dates: new Date(),
                   highlight: true,
                   // popover 点亮的日期上出现提示内容
                   popover: {
                   label: '美好的一天！要开心呦！',
                 },
                },
                ],
          }
      },
      methods :{
          login:function(num) {
             this.display=true;
             if(num==1){
                 this.showLogin=true;
                 this.showRegister=false
             }
             else if(num==2){
                 this.showRegister=true;
                 this.showLogin=false;
             }
          },
          cancle() {
            this.display=false;
            /*let param={
                token:this.$store.getters.Authorization ,
            };
            console.log(param);*/
            if(JSON.parse(sessionStorage.getItem('User'))){
                var obj=JSON.parse(sessionStorage.getItem('User'));
                this.showname=true;
                this.showstate=false;
                this.username=obj.username;
                
          }
          },
         
          loginOut(){
            var obj=JSON.parse(sessionStorage.getItem('User'));
            console.log(obj);
            var id=obj.id;
            var kind=obj.kind;
           axios.get('/api/demo/logout/'+id+'/'+kind,{
               params:{},
               headers:{BearerToken:obj.token,'Authorization':localStorage.getItem('Authorization')},
           }).then(resp => {
                    console.log(resp);
                    if (resp.status == "1") {
                        alert('退出成功');  
                        this.showname=false;
                        this.showstate=true; 
                        sessionStorage.removeItem('User');
                    }
                     else if (resp.status == "400") {
                        alert(resp.data.data);
                    }
                }).catch(error => {
                alert('未知错误');
                console.log(error); 
            });
           /* this.showname=false;
            this.showstate=true; */

          }
      },
     
      
  }
  </script>
  <style scoped>
    html {
          position: relative;
    }
  * {
      margin: 0 auto;
      padding: 0;
  }
  #mainpage {
      min-height: 200px;
      margin: 40px auto;
  } 
  h2 {
      font-size: 30px;
      width: 150px;
      border-bottom: cornflowerblue 3px solid;
  }
  .calendar {
      color: darkorchid;
  }  
  .header {
      display: flex;
  }
  .header a {
      padding: 0px 10px 0px 10px;
      cursor:pointer;

  } 
  .header a:hover {
      color: coral;
  }
  .header p {
      font-size: 17px;
      /*border-bottom: 2px solid cornflowerblue;*/
  }
  .list {
      margin-top: 200px;
  }
  .list a {
      display: block;
      line-height: 50px;
      margin: 80px;
      font-size: 20px;
      text-decoration: none;
      color: white;
  }
  .list a:nth-of-type(1) {
      background-color: coral;
  }
  .list a:nth-of-type(2) {
      background-color: rgba(31, 177, 38, 0.815);
  }
  .list a:nth-of-type(3) {
      background-color: rgba(80, 92, 255, 0.856);
  }
  .window {
    position: relative;
     position: absolute;
      width: 25%;
      min-height:200px;
      min-height: 400px;
      z-index: 100;
      top: 200px;
      left: 0px;
      right: 0;
      margin: auto;
      background-color: rgb(255, 255, 255);
      border:rgba(80, 92, 255, 0.651) 1px solid ;
      border-radius: 5px;
      box-shadow:0 0 7px rgba(0, 0, 0, 0.39);
      
  }
  .times {
      position: absolute;
      top: 0;
      right: 0;
      color: rgba(80, 92, 255, 0.856);
      cursor:pointer;

  }
  </style>