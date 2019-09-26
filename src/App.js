import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/login/Login'
import AppPage from './pages/app/AppLayout'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/app' component={AppPage} />
        <Redirect to='/login' />
      </Switch>
    </HashRouter>
  </Provider>
)

export default App