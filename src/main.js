import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import store from "./store";
//import store from './store/index'
import store from './../store/index'
//import axios from "axios";
import axios from './common/axios.js'
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;

//配置fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
 from '@fortawesome/vue-fontawesome'
 
library.add(fas, far, fab)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
//配置结束



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (JSON.parse(sessionStorage.getItem('User'))) {
      var obj=JSON.parse(sessionStorage.getItem('User'));
      config.headers.Authorization = obj.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });  
  

  