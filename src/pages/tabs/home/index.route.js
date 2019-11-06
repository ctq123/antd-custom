import React from 'react'

const route = {
  name: '首页',
  transKey: 'Home',
  routeProps: {
    path: '/app',
    component: React.lazy(() => import(/* webpackChunkName: 'home' */'./index')),
  },
  permKey: true, // 表示所有用户都拥有权限
}

export default route