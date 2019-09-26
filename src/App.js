import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginLayout from './layouts/LoginLayout'
import AuthRoute from './layouts/AuthRoute'
import AppLayout from './layouts/AppLayout'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={LoginLayout} />
        {/* 重写route处理登陆认证 */}
        <AuthRoute path='/app' component={AppLayout} />
        <Redirect to='/login' />
      </Switch>
    </HashRouter>
  </Provider>
)

export default App