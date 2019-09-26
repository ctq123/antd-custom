import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import LoginPage from '../pages/login'

/**
 * 登陆布局
 * @param {} param0 
 */
const LoginLayout = ({ match }) => (
  <div className='login-layout'>
    <Switch>
      <Route path={`${match.path}`} component={LoginPage} />
      <Redirect to={`${match.path}`} />
    </Switch>
  </div>
)

export default LoginLayout