import Vue from 'vue';
import Vuex from 'vuex';
import { parse } from '@fortawesome/fontawesome-svg-core';
Vue.use(Vuex);

var obj=JSON.parse(sessionStorage.getItem('User'));
const store = new Vuex.Store({
  state: {
    // 存储token
    //Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    Authorization:'',
    showname:false,
    showstate:true,
    username:'',
    showManager:'User',
  },
 getters:{
   Authorization: state => {
    if(!state.Authorization){
      console.log('state.Authorization 为空');
      return obj.token;
    }
      console.log('state.Authorization 不为空');
      return state.Authorization;
   },
   showname: state => {
     if(sessionStorage.getItem('User')){
       return true;
     }
     else{
       return state.showname;
     }
   },
   showstate: state => {
    if(sessionStorage.getItem('User')){
      return false;
    }
    else{
      return state.showstate;
    }
  },
  username: state => {
    if(sessionStorage.getItem('User')){
      return obj.username;
    }
    else{
      return state.username;
    }
  },
  showManager: state => {
    if(sessionStorage.getItem('User')){
      return obj.kind;
    }
    else{
      return state.showManager;
    }
  },
 },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  },

});
export default store;
