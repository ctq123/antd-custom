import React, { lazy, Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

const LoginPage = lazy(() => import('./pages/login'))
const AppPage = lazy(() => import('./pages/app'))

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
