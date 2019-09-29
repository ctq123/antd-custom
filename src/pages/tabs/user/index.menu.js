import React from 'react'

const menu = {
  menuKey: '31',
  menuName: '用户管理',
  routeProps: {
    path: '/app/users/userManage',
    component: React.lazy(() => import(/* webpackChunkName: 'usermanage' */'./index')),
  },
  redirectProps: {
    from: '/app/users',
    to: '/app/users/userManage',
  }
}

export default menu