// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// 前端UI
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import './common/css/klxin.scss'
// 微信sdk
// import wx from 'weixin-js-sdk'
// 自定义 js
// import './common/js/media.js'
// import { CountDown } from 'common/js/CountDown.js'

// 项目组件
import App from './App'
import Home from 'components/Home/home'
import Play from 'components/Play/paly'
// import Result from 'components/Result/result'
import Resulted from 'components/Result/resulted'
import Over from 'components/Result/over'
import Shared from 'components/Result/shared'
import Share from 'components/Result/share'

Vue.config.productionTip = false
// const debug = process.env.NODE_ENV !== 'production'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 定义vue的全局变量
Vue.prototype.$http = axios
Vue.use(VueRouter)
// Vue.use(MintUI)
// Vue.use(wx)
// const RT = new CountDown('2017-04-27 00:00:00')
// const WX_SECRET = 'f6b005a69bf6b46ee63a87a7877baf1e'
// const XY = resolve => require(['./components/XY.vue'], resolve)
// 配置路由
const routes = [{
    path: '/',
    component: Home,
    name: '厂花PK闯关赛'
  },
  {
    path: '/play',
    component: Play,
    name: '哪个票数最高'
  },
  {
    path: '/over',
    component: Over,
    name: '活动已结束'
  },
  {
    path: '/share',
    component: Shared,
    name: '安心记加班-闯关测审美'
  },
  {
    path: '/shared',
    component: Share,
    name: '安心记加班-闯关测审美'
  },
  {
    path: '/resulted',
    component: Resulted,
    name: '登记领奖信息'
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
  // scrollBehavior (to, from, savedPosition) {
  //   return savedPosition
  // }
})

router.afterEach((to, from, next) => {
  document.title = to.name
})

/* eslint-disable no-new */
// 实例化我们的 Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
