<template>
  <div id="register">
    <h1>REGISTER</h1>
    <form>
        <input type="text" v-model="register.username" @click="cancel2(register.username)"/>
        <font-awesome-icon icon="times-circle" size="1x" class="times-circle" @click="blank(register.username)" /><br>
        <input :type="password" v-model="register.password" @click="cancel2(register.password)"/>
        <font-awesome-icon icon="times-circle" size="1x" class="times-circle" @click="blank(register.password)" />
        <font-awesome-icon icon="eye" size="1x" class="eye" @click="showpassword" />
        <font-awesome-icon icon="plus-circle" spin size="2x" class="down" />
        <button type="submit"  @click.prevent="submit"><a>yes</a></button>
        
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'register',
  data() {
      return{
          register:{
              username:'name',
              password:'password',
              kind:'User'
          },
          password:'password',
      }
  },
  methods:{
      cancel2:function (value) {
          if(value=="name"){
              this.register.username="";
          }
          else if(value=="password"){
              this.register.password="";
          }
      },
      blank:function(value) {
          if(value==this.register.username){
              this.register.username="";
          }
          else if(value==this.register.password){
              this.register.password="";
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
      submit:function() {
          //this.$emit('sendmes',this.register);
          //console.log(this.register);
	        var params={
               username:this.register.username,
               password:this.register.password,
               kind:'User',
              };
            console.log(params);
          axios({method:'post',url: '/api/demo/installuser',data:params})
                .then(resp => {
                    console.log(resp);
                    if (resp.status == "200") {
                        alert('注册成功');
                    } else if (resp.status == "400") {
                        alert(resp.data.data);
                    }
                }).catch(error => {
                alert('nihao');
                console.log(error);
            });
    }
}
}
</script>
<style scoped>
@import"../css/login.css";

</style>