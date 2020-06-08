/*
 * @Description:
 * @Date: 2020-04-27 15:08:09
 * @LastEditTime: 2020-06-04 15:00:31
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import request from './utils/request'
import './utils/vant-components'
import 'amfe-flexible'
import './assets/cssreset.css'
Vue.prototype.$request = request
Vue.config.productionTip = false
import moment from 'moment' // 导入文件

Vue.prototype.$moment = moment //赋值使用 就是调用一下

Vue.filter('formatTime', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return moment.utc(value).format(formatStr)
})
Vue.filter('formatDate', function(value, formatStr = 'YYYY-MM-DD') {
  return moment.utc(value).format(formatStr)
})
moment.locale('zh-cn')

import { Dialog } from 'vant'
Vue.prototype.$Dialog = Dialog

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
