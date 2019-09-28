import React from 'react'

const menu = {
  menuKey: '2',
  menuName: '系统配置',
  routeProps: {
    path: '/app/system',
    component: React.lazy(() => import('./index')),
  },
}

export default menu