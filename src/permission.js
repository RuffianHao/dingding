/*
 * @Description:
 * @Date: 2020-06-07 18:27:17
 * @LastEditTime: 2020-06-08 17:43:21
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
    next()
    // let routePath = store.getters.permission_routes.map((route) => {
    //   return route.path
    // })
    // if (!routePath.includes(to.path)) {
    //   next({ path: from.path })
    //   alert('没有权限访问该页面')
    // } else {
    //   next()
    // }
  } else {
    try {
      const roles = await store.dispatch('user/login')

      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      router.addRoutes(accessRoutes)

      next({ ...to })
    } catch (error) {
      alert(error)
    }
  }
})
