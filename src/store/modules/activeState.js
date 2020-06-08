/*
 * @Description:
 * @Date: 2020-06-08 10:48:21
 * @LastEditTime: 2020-06-08 10:57:22
 */
const state = {
  purActive: 0,
  receiveActive: 0
}

const mutations = {
  setPurActive(state, active) {
    state.purActive = active
  },
  setReceiveActive(state, active) {
    state.receiveActive = active
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
