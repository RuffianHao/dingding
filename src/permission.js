/*
 * @Description:
 * @Date: 2020-06-07 18:27:17
 * @LastEditTime: 2020-06-08 14:19:06
 */
import router from './router'
import store from './store'
router.beforeEach(async (to, from, next) => {
  const hasRoles = store.getters.roles && store.getters.roles.length > 0
  if (hasRoles) {
    let routePath = store.getters.permission_routes.map((route) => {
      return route.path
    })
    if (!routePath.includes(to.path)) {
      next({ path: from.path })
      alert('没有权限访问该页面')
    } else {
      next()
    }
  } else {
    try {
      const roles = await this.$store.dispatch('user/getRoles')

      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      router.addRoutes(accessRoutes)

      next({ ...to })
    } catch (error) {
      alert(error)
    }
  }
})
