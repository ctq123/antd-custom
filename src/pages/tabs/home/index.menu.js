import React from 'react'

const menu = {
  menuKey: '1',
  menuName: '首页',
  routeProps: {
    exact: true,
    path: '/app',
    component: React.lazy(() => import(/* webpackChunkName: 'home' */'./index')),
  },
}

export default menu