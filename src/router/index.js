/*
 * @Description:
 * @Date: 2020-04-27 15:08:09
 * @LastEditTime: 2020-06-09 14:50:20
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '鹍骐物品管理系统'
    },
    roles: []
  },
  {
    path: '/stock',
    name: 'Stock',
    meta: { keepAlive: true, title: '物品列表' },
    component: () => import('../views/stock/index.vue')
  },
  {
    path: '/search-result',
    name: 'SearchResult',
    meta: { keepAlive: true, title: '查询结果' },
    component: () => import('../views/stock/search-result.vue')
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/record')
  },
  {
    path: '/purchase/modify/:id',
    name: 'PurchaseModify',
    component: () => import('../views/purchase'),
    meta: {
      title: '修改申请'
    }
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: () => import('../views/purchase'),
    meta: {
      title: '采购申请'
    }
  },
  {
    path: '/purchase/details/:id',
    name: 'PurchaseDetails',
    component: () => import('../views/purchase/details.vue'),
    meta: {
      title: '采购申请'
    }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('../views/audit'),
    meta: {
      title: '采购审批'
    }
  },
  {
    path: '/audit/details/:id',
    name: 'AuditDetails',
    component: () => import('../views/audit/details.vue'),
    meta: {
      title: '审批详情'
    }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/goods'),
    meta: {
      title: '物品添加'
    }
  },
  {
    path: '/goods/modify/:id',
    name: 'GoodsModify',
    component: () => import('../views/goods'),
    meta: {
      title: '物品修改'
    }
  },
  {
    path: '/receive',
    name: 'Receive',
    component: () => import('../views/receive'),
    meta: {
      title: '领用申请'
    }
  },
  {
    path: '/receive/details/:id',
    name: 'ReceiveDetails',
    component: () => import('../views/receive/details.vue'),
    meta: {
      title: '领用申请'
    }
  },
  {
    path: '/receive/modify/:id',
    name: 'ReceiveModify',
    component: () => import('../views/receive'),
    meta: {
      title: '领用申请'
    }
  },
  {
    path: '/receive-consent',
    name: 'ReceiveConsent',
    component: () => import('../views/receive-consent'),
    meta: {
      title: '领用确认'
    }
  },
  {
    path: '/receive-consent/details/:id',
    name: 'ReceiveConsentDetails',
    component: () => import('../views/receive-consent/details.vue'),
    meta: {
      title: '领用确认'
    }
  },
  {
    path: '/purchaing-sign',
    name: 'PurchaingSign',
    component: () => import('../views/purchase-sign/index.vue'),
    meta: {
      title: '采购确认'
    }
  },
  {
    path: '/purchaing-sign/details/:id',
    name: 'PurchaingSignDetails',
    component: () => import('../views/purchase-sign/details.vue'),
    meta: {
      title: '采购确认'
    }
  }
]

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '鹍骐物品管理系统'
    }
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: () => import('../views/purchase'),
    meta: { nav: true, title: '采购申请' }
  },
  {
    path: '/purchase/details/:id',
    name: 'PurchaseDetails',
    component: () => import('../views/purchase/details.vue'),
    meta: {
      title: '采购申请'
    }
  },
  {
    path: '/purchase/modify/:id',
    name: 'PurchaseModify',
    component: () => import('../views/purchase'),
    meta: {
      title: '修改申请'
    }
  },
  {
    path: '/receive',
    name: 'Receive',
    component: () => import('../views/receive'),
    meta: { nav: true, title: '领用申请' }
  },
  {
    path: '/receive/details/:id',
    name: 'ReceiveDetails',
    component: () => import('../views/receive/details'),
    meta: {
      title: '领用详情'
    }
  },
  {
    path: '/receive/modify/:id',
    name: 'ReceiveModify',
    component: () => import('../views/receive'),
    meta: {
      title: '领用修改'
    }
  }
]
export const asyncRoutes = [
  {
    path: '/stock',
    name: 'Stock',
    component: () => import('../views/stock/index.vue'),
    meta: { nav: true, title: '物品列表', roles: ['isAdmin'] }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/record'),
    meta: { title: '历史记录', roles: ['isBoss'] }
  },
  {
    path: '/receive-consent',
    name: 'ReceiveConsent',
    component: () => import('../views/receive-consent'),
    meta: { nav: true, title: '领用确认', roles: ['isLeaderInDepts'] }
  },
  {
    path: '/receive-consent/details/:id',
    name: 'ReceiveContestDetails',
    component: () => import('../views/receive-consent/details.vue'),
    meta: {
      title: '领用详情',
      roles: ['isLeaderInDepts']
    }
  },
  {
    path: '/purchaing-sign',
    name: 'PurchaingSign',
    component: () => import('../views/purchase-sign/index.vue'),
    meta: { nav: true, title: '签收入库', roles: ['isBoss'] }
  },
  {
    path: '/purchaing-sign/details/:id',
    name: 'PurchaingSignDetails',
    component: () => import('../views/purchase-sign/details'),
    meta: {
      title: '采购详情',
      roles: ['isLeaderInDepts']
    }
  },
  {
    path: '/audit',
    name: 'Audit',
    component: () => import('../views/audit'),
    meta: { nav: true, title: '采购审批', roles: ['isLeaderInDepts'] }
  },
  {
    path: '/audit/details/:id',
    name: 'AuditDetails',
    component: () => import('../views/audit/details.vue'),
    meta: {
      title: '审批详情',
      roles: ['isLeaderInDepts']
    }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/goods'),
    meta: {
      title: '物品添加',
      roles: ['isBoss']
    }
  },
  {
    path: '/goods/modify/:id',
    name: 'GoodsModify',
    component: () => import('../views/goods'),
    meta: {
      title: '物品修改',
      roles: ['isBoss']
    }
  }
]
// const createRouter = () =>
//   new VueRouter({
//     // mode: 'history', // require service support
//     routes: constantRoutes
//   })

const router = new VueRouter({
  routes: constantRoutes
})

export default router
