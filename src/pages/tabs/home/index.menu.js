import React from 'react'

const menu = {
  menuKey: '1',
  menuName: '首页',
  routeProps: {
    // exact精确匹配，一定要，否则以它的开头都会模糊匹配到当前页，造成其他路由无效
    exact: true,
    path: '/app',
    component: React.lazy(() => import(/* webpackChunkName: 'home' */'./index')),
  },
  permKey: 'menu.home',
}

export default menu