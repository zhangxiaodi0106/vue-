//axios-init.js 
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/apis'; // 配置axios请求的地址
//axios.defaults.baseURL = 'https://oa1.youthol.tech/'; // 配置axios请求的地址
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// axios.defaults.crossDomain = true;
axios.defaults.withCredentials = false; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
//配置开发环境和打包
if(process.env.NODE_ENV==="development"){
    axios.defaults.baseURL = 'http://localhost:8080/apis'; // 配置axios请求的地址
  }else if(process.env.NODE_ENV==="production"){
    axios.defaults.baseURL = 'https://oa1.youthol.tech/';
  }
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
// 配置响应拦截器 
axios.interceptors.response.use(res => {
    //这里面写所需要的代码
    // if (res.data.code == '401') {
    //     //全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
    //     return false;
    // };
    if(res.status === 200){
        return Promise.resolve(res.data);
    }else{
        return Promise.reject({
            code: -1, msg: '请求出错'
        });
    }
}, error => {
    return Promise.reject(error);
});

export default axios;