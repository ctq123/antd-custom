import React from 'react'

const route = {
  name: '数据转换',
  routeProps: {
    path: '/app/exchange',
    component: React.lazy(() => import(/* webpackChunkName: 'exchange' */'./index')),
  },
  permKey: true, // 表示所有用户都拥有权限
}

export default route