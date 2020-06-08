/*
 * @Description:
 * @Date: 2020-06-07 21:27:50
 * @LastEditTime: 2020-06-08 17:37:07
 */
import * as dd from 'dingtalk-jsapi'
import request from '../../utils/request'
const state = {
  userInfo: {},
  roles: [],
  defaultRoles: ['isAdmin', 'isBoss', 'isLeaderInDepts', 'isSenior']
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
  login({ commit, dispatch }) {
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
            let roles = await dispatch('getRoles')
            resolve(roles)
          },
          onFail: function(err) {
            // alert(JSON.stringify(err))
            reject()
          }
        })
      })
    })
  },
  getRoles({ commit, state }) {
    return new Promise((resolve) => {
      let roles = []
      const userInfo = state.userInfo
      // const createRoles = ['isAdmin', 'isBoss', 'isLeaderInDepts', 'isSenior']
      state.defaultRoles.forEach((key) => {
        if (userInfo[key] === true) {
          roles.push(key)
        }
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
