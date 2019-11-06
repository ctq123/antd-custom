import React from 'react'

const route = {
  name: '系统配置',
  transKey: 'System Configuration',
  routeProps: {
    path: '/app/system',
    component: React.lazy(() => import(/* webpackChunkName: 'system' */'./index')),
  },
  permKey: 'menu.system',
}

export default route