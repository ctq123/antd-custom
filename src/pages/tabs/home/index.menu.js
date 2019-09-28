import React from 'react'

const menu = {
  menuKey: '1',
  menuName: '首页',
  routeProps: {
    exact: true,
    path: '/app',
    component: React.lazy(() => import('./index')),
  },
}

export default menu