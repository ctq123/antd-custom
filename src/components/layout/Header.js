import React, { PureComponent, Fragment } from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import styles from './Header.less'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { translateText } from '@utils/translate'

const { SubMenu } = Menu

class Header extends PureComponent {
  constructor(props) {
    super(props)
  }

  handleClickSignout = e => {
    if (e.key === 'SignOut') {
      this.props.dispatch({
        type: 'login/logout',
      })
    }
  }

  handleClickLanguage = e => {
    const language = e.key
    this.props.dispatch({
      type: 'app/language',
      payload: {
        language
      }
    })
  }

  toggle = e => {
    if (this.props.toggle) {
      this.props.toggle()
    }
  }

  render() {
    const { collapsed, language, languages } = this.props
    const currentLanguage = languages.find(item => item.key === language)
    return (
      <Layout.Header className={styles.header}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.rightcon}>
          {/* 语言菜单 */}
          <Menu
            selectedKeys={[currentLanguage.key]}
            onClick={this.handleClickLanguage}
            mode="horizontal"
          >
            <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
              {languages.map(item => (
                <Menu.Item key={item.key}>
                  <Avatar
                    size="small"
                    style={{ marginRight: 8 }}
                    src={item.flag}
                  />
                  {item.title}
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
          {/* 登陆用户问候语 */}
          <Menu key="user" mode="horizontal" onClick={this.handleClickSignout}>
            <SubMenu
              title={
                <Fragment>
                  <span style={{ color: '#999', marginRight: 4 }}>
                    {translateText({ id: 'Hi,' })}
                  </span>
                  <span>{'guest'}</span>
                  <Avatar style={{ marginLeft: 8 }} src={'../../../assets/img/avatar.jpeg'} />
                </Fragment>
              }
            >
              <Menu.Item key="SignOut">
                {translateText({ id: 'Sign out' })}
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    )
  }
}

const mapStateToProp = (state) => {
  const { app } = state
  return app
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(injectIntl(Header))