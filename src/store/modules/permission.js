/*
 * @Description:
 * @Date: 2020-06-07 21:27:56
 * @LastEditTime: 2020-06-08 13:05:30
 */

// /*
//  * @Description:
//  * @Date: 2020-06-05 19:04:06
//  * @LastEditTime: 2020-06-08 10:57:14
//  */

// import { asyncRoutes, constantRoutes } from '../../router/index'

// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some((role) => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

// export function filterAsyncRoutes(routes, roles) {
//   const res = []
//   routes.forEach((route) => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       // if (tmp.children) {
//       //   tmp.children = filterAsyncRoutes(tmp.children, roles)
//       // }
//       // ------no children
//       res.push(tmp)
//     }
//   })
//   console.log(res)
//   return res
// }

// const state = {
//   routes: [],
//   addRoutes: []
// }

// const mutations = {
//   SET_ROUTES: (state, routes) => {
//     state.addRoutes = routes
//     state.routes = constantRoutes.concat(routes)
//   }
// }

// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise((resolve) => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }
export default {
  namespaced: true
  // state,
  // mutations,
  // actions
}
