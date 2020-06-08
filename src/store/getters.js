/*
 * @Description:
 * @Date: 2020-06-07 21:27:33
 * @LastEditTime: 2020-06-08 15:32:15
 */
const getters = {
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes
}
export default getters
