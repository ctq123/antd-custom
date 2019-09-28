import React, { PureComponent, Fragment, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import Header from '../../components/layout/Header'
import Sider from '../../components/layout/Sider'
import Footer from '../../components/layout/Footer'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import styles from './index.less'
import { getMenusMap } from '../../menus'

const { Content } = Layout

const menusKeyMap = getMenusMap('key')

/**
 * app主页面布局
 */
class AppPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      routes: this.generateRoute(),
    }
  }

  generateRoute = () => {
    // console.log("generateRoute")
    // 读取所有index.menu.js文件
    const tabs = require.context('../tabs', true, /index\.menu\.js/)
    // 已有的菜单路由
    const existMenu = {}
  
    // 生成routes
    let routes = tabs.keys().map(path => {
      path = path.replace(/^(\.\/)/g, '')
      const menu = require('../tabs/' + path).default
      const { menuKey, menuName, routeProps } = menu || {}
      if (menuKey && routeProps) {
        if (!existMenu[menuKey]) {
          if (menusKeyMap[menuKey]) {
            existMenu[menuKey] = menu
            return <Route key={menuKey} { ...routeProps } />
          } else {
            console.error(`警告：菜单【${menuName}-${menuKey}】不存在！请先在menus/index.js添加该菜单`)
          }
        } else {
          const m = existMenu[menuKey]
          console.error(`警告：已存在相同的菜单【${m.menuName}-${m.menuKey}】，请在index.menu.js中重置menuKey`)
        }
      }
    })
    return routes
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed, routes } = this.state
    const { history, match } = this.props
    return (
      <Layout className={styles.app}>
        <Sider collapsed={collapsed} history={history} />
        <Layout>
          <Header collapsed={collapsed} history={history} toggle={this.toggle} />
          <Content className={styles.content}>
            <Breadcrumb history={history} />
            <Suspense fallback={<div>Loading...</div>}>
              <Fragment>
                <Switch>
                  { routes }
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
  // 对应app.model.js中的name
  const { app } = state
  return app
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppPage))