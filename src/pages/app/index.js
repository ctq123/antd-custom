import React, { PureComponent, Fragment, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import Header from '@components/layout/Header'
import Sider from '@components/layout/Sider'
import Footer from '@components/layout/Footer'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import styles from './index.less'
import { getMenusMap, generateRoute } from '@menus/menu.route'
import { getCookie } from '@utils/handleCookie'
import { setAxiosToken } from '@utils/handleAxios'

const { Content } = Layout

/**
 * app主页面布局
 */
class AppPage extends PureComponent {
  constructor(props) {
    super(props)
    const menusKeyMap = getMenusMap('key', props.menuList)
    const { routes, existRoute, redirects } = generateRoute(menusKeyMap)
    this.state = {
      collapsed: false,
      routes,
      existRoute,
      redirects,
    }
  }
  
  componentDidMount() {
    if (!this.state.loginStatus) {
      this.goToPage('/login')
    }
    const token = getCookie('token')
    if (token) {
      setAxiosToken(token)
    } else {
      // this.goToPage('/login')
      this.props.dispatch({
        type: 'login/logout',
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginStatus !== prevState.loginStatus) {
      return {
        loginStatus: nextProps.loginStatus,
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loginStatus) {
      this.goToPage('/login')
    }
  }

  goToPage = (path) => {
    const { history } = this.props
    history && path && history.push(path)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed, routes, redirects, existRoute } = this.state
    const { history, match, menuList } = this.props
    return (
      <Layout className={styles.app}>
        <Sider collapsed={collapsed} history={history} existRoute={existRoute} menuList={menuList} />
        <Layout>
          <Header collapsed={collapsed} history={history} toggle={this.toggle} />
          <Content className={styles.content}>
            <Breadcrumb history={history} menuList={menuList} />
            <Suspense fallback={<div>Loading...</div>}>
              <Fragment>
                <Switch>
                  { routes }
                  { redirects }
                  <Redirect to={match.url} />
                </Switch>
              </Fragment>
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProp = (state) => {
  const { login, app } = state
  return {
    ...login,
    menuList: app.menuList
  }
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppPage))