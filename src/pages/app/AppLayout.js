import React, { PureComponent, Fragment } from 'react'
import { Layout, Button } from 'antd'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../components/layout/Header'
import Sider from '../../components/layout/Sider'
import Footer from '../../components/layout/Footer'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import styles from './AppLayout.less'

const { Content } = Layout

class AppLayout extends PureComponent {
  constructor(props) {
    super(props)
    console.log("props", props)
    this.state = {
      history: props.history,
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onIncrement = (e) => {
    this.props.dispatch({
      type: 'INCREMENT',
    })
  }

  onIncrementAsync = (e) => {
    this.props.dispatch({
      type: 'INCREMENT_ASYNC',
      payload: {
        data: 10,
      }
    })
  }

  render() {
    const { collapsed, history } = this.state
    return (
      <Layout className={styles.app}>
        <Sider collapsed={collapsed} />
        <Layout>
          <Header collapsed={collapsed} history={history} toggle={this.toggle} />
          <Content className={styles.content}>
            <Breadcrumb />
            <aside>
              <Button type='primary' onClick={this.onIncrement}>+1</Button>
              <Button type='primary' onClick={this.onIncrementAsync} loading={this.props.loading}>+10</Button>
              <h4>count: { this.props.count }</h4>
            </aside>
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
