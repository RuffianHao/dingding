/*
 * @Description:
 * @Date: 2020-06-07 21:27:50
 * @LastEditTime: 2020-06-08 14:38:40
 */
import * as dd from 'dingtalk-jsapi'
import request from '../../utils/request'
const state = {
  userInfo: {},
  roles: []
}
const mutations = {
  SET_USER(state, data) {
    state.userInfo = data
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  }
}
const actions = {
  login({ commit }) {
    return new Promise(async (resolve, reject) => {
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: 'ding58ebf362de57103735c2f4657eb6378f',
          onSuccess: async (result) => {
            let { data } = await request({
              method: 'get',
              url: 'login',
              params: {
                code: result.code
              }
            })
            commit('SET_USER', data.body)
            resolve()
          },
          onFail: function(err) {
            alert(JSON.stringify(err))
            reject()
          }
        })
      })
    })
  },
  getRoles({ commit, state }, roles) {
    return new Promise((resolve) => {
      let roles = []
      const userInfo = state.userInfo
      const creatRole = ['isAdmin', 'isBoss', 'isLeaderInDepts', 'isSenior']

      creatRole.forEach((key) => {
        if (userInfo[key] === false) roles.push(key)
      })
      commit('SET_ROLES', roles)
      resolve(roles)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
