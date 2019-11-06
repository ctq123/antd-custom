import React from 'react'

const route = {
  name: 'Example页',
  transKey: 'Example Page',
  routeProps: {
    path: '/app/example',
    component: React.lazy(() => import(/* webpackChunkName: 'home' */'./index')),
  },
  permKey: 'srm.route_example', // 表示所有用户都拥有权限
}

export default route