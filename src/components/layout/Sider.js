import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import menus from '../../menus'
import styles from './Sider.less'

const { SubMenu } = Menu
const MenuItem = Menu.Item

class Sider extends PureComponent {
  
  constructor(props) {
    super(props)
    const { pathname } = (props.history && props.history.location) || {}
    this.historyListener(props.history)
    this.state = {
      selectedKey: pathname,
      defaultOpenKeys: this.getDefaultOpenKeys(pathname),
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  historyListener = (history) => {
    // 处理输入url地址，触发菜单栏活动页
    this.unlisten = history && history.listen(location => {
      const { pathname } = location || {}
      if (pathname) {
        this.setState({
          selectedKey: pathname
        })
      }
    })
  }

  getDefaultOpenKeys = (pathname) => {
    const paths = (pathname || '').split('/')
    let res = []

    if (paths && paths.length > 3) {
      for(let i = 3; i <= paths.length; i++) {
        let p = paths.slice(0, 3).join('/')
        res.push(p)
      }
    }
    return res
  }

  onClick = (item) => {
    console.log("item", item)
    const { history } = this.props
    if (history && item.key) {
      history.push(item.key)
    }
  }

  generateMenuItem = (data) => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
          key={item.path}
          title={
            <span>
              { item.icon && <Icon type={item.icon} /> }
              <span>{item.name}</span>
            </span>
          }
        >
          {this.generateMenuItem(item.children)}
        </SubMenu>
        )
      }
      return (
        <MenuItem key={item.path}>{item.name}</MenuItem>
      )
    })
  }

  render() {
    const { collapsed } = this.props
    const { selectedKey, defaultOpenKeys } = this.state
    
    return (
      <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" 
          mode="inline" 
          onClick={this.onClick}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          >
          {this.generateMenuItem(menus)}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default Sider