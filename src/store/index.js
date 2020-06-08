/*
 * @Description:
 * @Date: 2020-04-27 15:08:09
 * @LastEditTime: 2020-06-08 11:16:17
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import getters from './getters'
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((module, modulePath) => {
  const modulesName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  module[modulesName] = value.default
  return module
}, {})
export default new Vuex.Store({
  modules,
  getters
})
// export default new Vuex.Store({
//   state: {
//     userInfo: {},
//     purActive: 0,
//     receiveActive: 0
//   },
//   mutations: {
//     setUser(state, data) {
//       state.userInfo = data
//     },
//     setPurActive(state, active) {
//       state.purActive = active
//     },
//     setReceiveActive(state, active) {
//       state.receiveActive = active
//     }
//   },
//   actions: {},
//   modules: {}
// })
