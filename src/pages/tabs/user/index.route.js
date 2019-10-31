import React from 'react'

const route = {
  name: '用户管理',
  transKey: 'User Management',
  routeProps: {
    path: '/app/users/userManage',
    component: React.lazy(() => import(/* webpackChunkName: 'usermanage' */'./index')),
  },
  permKey: 'menu.userManage',
}

export default route