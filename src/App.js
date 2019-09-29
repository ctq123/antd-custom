import React, { lazy, Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

/* webpackChunkName: "login" */ //打包时chunk名称，默认为数字，不利于定位分析打包文件
const LoginPage = lazy(() => import(/* webpackChunkName: 'login' */'./pages/login'))
const AppPage = lazy(() => import(/* webpackChunkName: 'app' */'./pages/app'))

const App = (
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/app' component={AppPage} />
          <Redirect to='/login' />
        </Switch>
      </Suspense>
    </HashRouter>
  </Provider>
)

export default App
