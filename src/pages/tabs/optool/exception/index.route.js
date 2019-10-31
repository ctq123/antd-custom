import React from 'react'

const route = {
  name: '异常处理',
  transKey: 'Exception Handling',
  routeProps: {
    path: '/app/optool/exceptionHandle',
    component: React.lazy(() => import(/* webpackChunkName: 'exceptionHandle' */'./index')),
  },
  permKey: 'srm.route_exception-handle',
}

export default route