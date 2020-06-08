/*
 * @Description:
 * @Date: 2020-04-30 16:19:48
 * @LastEditTime: 2020-06-08 17:50:18
 */

import axios from 'axios'
axios.defaults.withCredentials = true
// axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
const request = axios.create({
  // http://dingtalk.caicaishouyou.com/index/

  baseURL: 'http://192.168.1.125:5000/' // 设置公用请求api前置
})
// request.interceptors.request.use(function(response) {
//   if (response.method === 'post') {
//     response.transformRequest = function(data) {
//       let ret = ''
//       for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret
//     }
//   }
//   return response
// })
request.interceptors.response.use(
  function(response) {
    return response
  },
  async (error) => {
    var errMsg = ''
    if (error.response.status === 403) {
      errMsg = '没有权限'
      return Promise.reject(errMsg)
    } else if (error.response.status === 401) {
      errMsg = '请登录'
      alert('请登录')
      return Promise.reject(errMsg)
    }
    return Promise.reject(error)
  }
)
export default request
