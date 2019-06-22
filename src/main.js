import Vue from 'vue'
import App from './App'
import router from './router'
// 引入JQuery
import $ from 'jquery'

// 引入进亮封装的axios
import axios from './axios/axios'
// 引入原生axios
// import axios from 'axios'

// 引入store
import store from './store/store'

// 引入基础样式
import '../static/reset.css'

// 引入ElementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入mocking
// require('./mock.js')

// 原生axios挂载
// Vue.use(axios)

axios.defaults.withCredentials = false;
// 进亮的axios挂载
 Vue.prototype.axios = axios   

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
