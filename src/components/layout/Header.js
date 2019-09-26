import React, { PureComponent, Fragment } from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickMenu = e => {
    if (e.key === 'SignOut') {
      this.props.history.push('/login')
    }
  }

  toggle = e => {
    if (this.props.toggle) {
      this.props.toggle()
    }
  }

  render() {
    const { collapsed } = this.props
    return (
      <Layout.Header className={styles.header}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div>
          <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
            <SubMenu
              title={
                <Fragment>
                  <span style={{ color: '#999', marginRight: 4 }}>
                    Hi,
                  </span>
                  <span>{'guest'}</span>
                  <Avatar style={{ marginLeft: 8 }} src={'../../../assets/img/avatar.jpeg'} />
                </Fragment>
              }
            >
              <Menu.Item key="SignOut">
                Sign out
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    )
  }
}
export default Header