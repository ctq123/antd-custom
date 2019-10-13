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
    const { routes, existRoute, redirects } = generateRoute()
    this.state = {
      collapsed: false,
      routes,
      existRoute,
      redirects,
    }
  }
  
  componentDidMount() {
    const { dispatch } = this.props
    const username = sessionStorage.getItem('username')
    const token = getCookie('token')
    if (!this.state.loginStatus) {
      this.goToPage('/login')
    }
    if (token) {
      setAxiosToken(token)
      // 获取用户权限列表
      dispatch({
        type: 'app/get/permission',
        payload: {
          username
        }
      })
    } else {
      // this.goToPage('/login')
      dispatch({
        type: 'login/logout',
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { menuList } = nextProps
    if (nextProps.loginStatus !== prevState.loginStatus) {
      return {
        loginStatus: nextProps.loginStatus,
      }
    }
    if (menuList) {
      // 根据用户权限菜单重新生成菜单路由
      if (menuList.length != prevState.menuLen) {
        const menusKeyMap = getMenusMap('key', menuList)
        const { routes, existRoute, redirects } = generateRoute(menusKeyMap)
        return {
          routes,
          existRoute,
          redirects,
          menuLen: menuList.length
        }
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
    const siderProps = {
      collapsed,
      history,
      existRoute,
      menuList
    }
    
    return (
      <Layout className={styles.app}>
        <Sider {...siderProps} />
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
    menuList: app.menuList,
  }
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppPage))