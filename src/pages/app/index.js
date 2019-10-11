import React, { PureComponent, Fragment, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import Header from '@components/layout/Header'
import Sider from '@components/layout/Sider'
import Footer from '@components/layout/Footer'
import Breadcrumb from '@components/breadcrumb/Breadcrumb'
import styles from './index.less'
import { getMenusMap } from '@menus/index'
import { getCookie } from '@utils/handleCookie'
import { setAxiosToken } from '@utils/handleAxios'

const { Content } = Layout

const menusKeyMap = getMenusMap('key')

/**
 * app主页面布局
 */
class AppPage extends PureComponent {
  constructor(props) {
    super(props)
    const { routes, existRoute, redirects } = this.generateRoute()
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

  // 根据index.menu.js配置生成路由
  generateRoute = () => {
    // 读取所有index.menu.js文件
    const menus = require.context('../tabs', true, /index\.menu\.js/)
    // 已有的菜单路由
    const existMenu = {}
    // 已生成有效的路由(菜单有，路由不一定有效，如包含二级菜单的一级菜单)
    const existRoute = {}
    // 若有自定义重定向的需要重新生成
    const redirectsTemp = []
  
    // 生成路由routes
    const routes = menus.keys().map(path => {
      const menu = menus(path).default
      const { menuKey, menuName, routeProps, redirectProps } = menu || {}
      if (menuKey && routeProps && routeProps.path) {
        if (!existMenu[menuKey]) {
          if (menusKeyMap[menuKey]) {
            existMenu[menuKey] = menu
            existRoute[routeProps.path] = menu
            if (redirectProps && redirectProps['to']) {
              redirectsTemp.push(redirectProps)
            }
            return <Route key={menuKey} { ...routeProps } />
          } else {
            console.error(`警告：【${menuName}-${menuKey}】菜单路由无效！不存在该菜单ID！请先在菜单文件menus/index.js中添加菜单配置`)
          }
        } else {
          const m = existMenu[menuKey]
          console.error(`警告：【${menuName}-${menuKey}】菜单路由无效！已存在相同的菜单ID【${m.menuName}-${m.menuKey}】，请在index.menu.js中重置menuKey！`)
        }
      } else {
        console.error(`警告：【${menuName}-${menuKey}】菜单路由无效！menuKey，routeProps，routeProps.path不能为空！`)
      }
    })
    // Redirect重定向需要放到最底部
    // 先对path长度进行排序，因为redirect中from字段匹配到马上返回，因此from字段越长越靠前
    const compare = (prop) => {
      return (obj1, obj2) => {
        return (obj1[prop] || '').length - (obj2[prop] || '').length
      }
    }
    const redirectsArr = redirectsTemp.sort(compare('from'))
    // 生成重定向路由
    const redirects = redirectsArr.map((item, index) => {
      if (item && item['to']) {
        return <Redirect key={item['from'] || index} { ...item } />
      }
    })
    return { routes, existRoute, redirects }
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
    const { history, match } = this.props
    return (
      <Layout className={styles.app}>
        <Sider collapsed={collapsed} history={history} existRoute={existRoute} />
        <Layout>
          <Header collapsed={collapsed} history={history} toggle={this.toggle} />
          <Content className={styles.content}>
            <Breadcrumb history={history} />
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
  const { login } = state
  return login
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppPage))