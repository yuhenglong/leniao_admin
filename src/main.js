import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入store
import store from './store/store'

// 引入基础样式
import '../static/reset.css'

// 引入ElementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//挂载在vue的原型上
Vue.prototype.axios = axios;

Vue.config.productionTip = false

// 引入mocking
require('./mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
