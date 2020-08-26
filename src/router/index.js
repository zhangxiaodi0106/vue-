import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import index from "../views/index.vue";
import register from '../components/register'
import login from '../components/login'
import calendar from '../components/calendar'
import VCalendar from 'v-calendar'; // 引入日历插件
import addnote from '../views/addnote'
import managePage from '../views/managePage'
import getNote from '../components/getNote'
import successNote from '../components/successNote'
import checkNote from '../components/checkNote'
import withoutNotes from '../components/withoutNotes'
import failNote from '../components/failNote'
import canclenote from '../views/canclenote'
import showState from '../views/showState'
import TimeLine from '../components/TimeLine'
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});//日历配置
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path:"/index",
    name:"index",
    component:index
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/addnote',
    name: 'addnote',
    component: addnote
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
  {
    path: '/canclenote',
    name: 'canclenote',
    component: canclenote,
  },
  {
    path: '/managePage',
    name: 'managePage',
    component: managePage,
  },
  {
    path: '/getNote',
    name: 'getNote',
    component:getNote,
  },
  {
    path: '/checkNote',
    name: 'checkNote',
    component:checkNote,
  },
  {
    path: '/showState',
    name: 'showState',
    component:showState,
  },
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component:TimeLine,
  },
  {
    path: '/successNote',
    name: 'successNote',
    component:successNote,
  },
  {
    path: '/withoutNotes',
    name: 'withoutNotes',
    component:withoutNotes,
  },
  {
    path: '/failNote',
    name: 'failNote',
    component:failNote,
  },
];

const router = new VueRouter({
  routes
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/index'||to.path === '/') {
    next();
   console.log('yes');
  } else {
    if(JSON.parse(sessionStorage.getItem('User'))){
      var obj=JSON.parse(sessionStorage.getItem('User'));
      var token = obj.token;
      if (token==null || token=='') {
          alert('请先登录');
          next('/index');
        } else {
         next();
        }
  }
}
});


export default router;
