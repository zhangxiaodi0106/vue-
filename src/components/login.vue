<template>
  <div id="login">
    <h1>LOGIN</h1>
    <form>
        <input type="text" v-model="login.username" @click="cancel1(login.username)"/>
        <font-awesome-icon icon="times-circle" size="1x" class="times-circle" @click="blank(login.username)"/><br>
        <input :type="password" v-model="login.password" @click="cancel1(login.password)"/>
        <font-awesome-icon icon="times-circle" size="1x" class="times-circle" @click="blank(login.password)" />
        <font-awesome-icon icon="eye" size="1x" class="eye" @click="showpassword" />
        <font-awesome-icon icon="plus-circle" spin size="2x" class="down" />
        <button type="submit"   @click.prevent="submit"><a>yes</a></button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';
import {mapState} from 'vuex';

export default {
  name: 'login',
  data() {
      return{
          login:{
              username:'name',
              password:'password',
          },
          password:'password',
      }
  },
  computed:{
    ...mapState(['Authorization']),
},
  methods:{

      cancel1:function (value) {
          if(value=="name"){
              this.login.username="";
          }
          else if(value=="password"){
              this.login.password="";
          }
      },
      blank:function(value) {
          if(value==this.login.username){
              this.login.username="";
          }
          else if(value==this.login.password){
              this.login.password="";
          }
      },
      showpassword(){
          if(this.password=='password'){
              this.password='text';
          }
          else{
              this.password='password';
          }
      },
      ...mapMutations(['setToken']),
      submit() {
          let _this = this;
          if (this.login.username =='' || this.login.password =='') {
          alert('账号或密码不能为空');
          } else {
          axios({method: 'post',url: '/api/demo/checkapp',data:_this.login}).then(res => {
          console.log(res);
          _this.userToken = 'Bearer ' + res[0].api_token;
          // 将用户token保存到vuex中
         _this.$store.commit('changeLogin','Authorization: _this.userToken');
         _this.$store.state.Authorization= _this.userToken;
          //_this.$router.push('/index');
          alert('登陆成功');
          var user={
              id:res[0].id,
              username:this.login.username,
              token:_this.userToken,
              kind:res[0].kind,
          }
          sessionStorage.setItem('User', JSON.stringify(user));
          var obj=JSON.parse(sessionStorage.getItem('User'));
          console.log(obj);
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      }
      //this.$emit('sendmes',false);
         //console.log(this.login);
    }
},

}
</script>
<style scoped>
@import"../css/login.css";
</style>