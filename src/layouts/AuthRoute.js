import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * 处理未登陆直接输入app路径的情况
 */
class AuthRoute extends PureComponent {
  componentDidMount() {
    // get login status
  }

  render() {
    const { component: Component, username, ...rest } = this.props
    return (
      <Route { ...rest } render={
        props => { return username ? <Component {...props} /> : <Redirect to='/login' /> }
      } />
    )
  }
}

const mapStateToProp = state => {
  const login = state.login
  return {
    username: 'test'
  }
}

export default connect(mapStateToProp)(AuthRoute)
