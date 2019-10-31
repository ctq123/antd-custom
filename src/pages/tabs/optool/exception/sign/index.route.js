import React from 'react'

const route = {
  name: '签收率处理',
  transKey: 'Processe Sign yield',
  routeProps: {
    path: '/app/optool/exceptionHandle/sign',
    component: React.lazy(() => import(/* webpackChunkName: 'sign' */'./index')),
  },
  permKey: 'srm.route_eh_sign',
}

export default route