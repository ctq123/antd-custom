import React, { PureComponent, Fragment } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import Header from '../components/layout/Header'
import Sider from '../components/layout/Sider'
import Footer from '../components/layout/Footer'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import styles from './AppLayout.less'

import Home from '../pages/home'
import User from '../pages/user'

const { Content } = Layout

/**
 * app主页面布局
 */
class AppLayout extends PureComponent {
  constructor(props) {
    super(props)
    console.log("props", props)
    this.state = {
      history: props.history,
      match: props.match,
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed, history, match } = this.state
    return (
      <Layout className={styles.app}>
        <Sider collapsed={collapsed} />
        <Layout>
          <Header collapsed={collapsed} history={history} toggle={this.toggle} />
          <Content className={styles.content}>
            {/* <Breadcrumb /> */}
            <Switch>
              <Route path={`${match.path}`} exact component={Home} />
              <Route path={`${match.path}/users`} component={User} />
              <Redirect to={`${match.url}`} />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

const mapStateToProp = state => {
  const { incrementReducer } = state
  return incrementReducer
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(AppLayout))