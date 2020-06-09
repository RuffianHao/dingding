/*
 * @Description:
 * @Date: 2020-06-07 18:27:17
 * @LastEditTime: 2020-06-09 14:55:13
 */
import router from './router'
import store from './store'
import * as dd from 'dingtalk-jsapi'
router.beforeEach(async (to, from, next) => {
  dd.ready(function() {
    dd.biz.navigation.setTitle({
      title: to.meta.title,
      onSuccess: function(result) {
        next()
      },
      onFail: function(err) {}
    })
  })

  const hasRoles = store.getters.roles && store.getters.roles.length > 0

  if (hasRoles) {
    let roles = store.getters.roles
    if (to.meta.roles === undefined) {
      next()
    } else {
      let toRoles = to.meta.roles || []
      toRoles.forEach((role) => {
        if (roles.includes('isAdmin')) {
          next()
        } else {
          if (roles.includes(role)) {
            next()
          } else {
            alert('没权限')
            next({ path: '/' })
          }
        }
      })
    }
  } else {
    try {
      const roles = await store.dispatch('user/login')
      store.commit('user/SET_ROLES', roles)
      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      router.addRoutes(accessRoutes)

      next({ ...to })
    } catch (error) {
      alert(error)
    }
  }
})
