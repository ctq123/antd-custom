import React from 'react'

const menu = {
  menuKey: '32',
  menuName: '角色管理',
  routeProps: {
    path: '/app/users/roleManage',
    component: React.lazy(() => import('./index')),
  },
}

export default menu