import React from 'react'

const route = {
  name: '缺货率处理',
  transKey: 'Processe Out of stock',
  routeProps: {
    path: '/app/optool/exceptionHandle/outstock',
    component: React.lazy(() => import(/* webpackChunkName: 'outstock' */'./index')),
  },
  permKey: 'srm.route_eh_outstock',
}

export default route