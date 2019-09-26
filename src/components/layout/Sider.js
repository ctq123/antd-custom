import React, { PureComponent, Fragment } from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import styles from './Sider.less'

const { SubMenu } = Menu
const MenuItem = Menu.Item

const menus = [
  { id: 1, name: '首页', icon: 'home', children: [] },
  { id: 2, name: '系统配置', icon: 'laptop', children: [
    { id: 21, name: '接口配置', children: [] },
    { id: 22, name: '常量配置', children: [] },
  ] },
  { id: 3, name: '用户管理', icon: 'user', children: [
    { id: 31, name: '用户管理', children: [] },
    { id: 32, name: '角色管理', children: [] },
  ] },
]
class Sider extends PureComponent {

  onClick = (item) => {
    console.log("item", item)
    let list = menus
    const { keyPath } = item || {}
    const getItem = (list, prop, val) => {
      for(let obj of list) {
        if (obj[prop] === val) {
          return obj
        }
      }
    }
    
    keyPath && keyPath.reverse()
    for(let k of keyPath) {
      let obj = getItem(list, 'id', Number(k))
      if (obj) {
        console.log(obj.name)
        list = obj.children
      }
    }
  }

  generateMenuItem = (data) => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
          key={item.id}
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
        <MenuItem key={item.id}>{item.name}</MenuItem>
      )
    })
  }

  render() {
    const { collapsed } = this.props
    
    return (
      <Layout.Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" 
          mode="inline" 
          onClick={this.onClick}
          defaultSelectedKeys={['1']}
          >
          {this.generateMenuItem(menus)}
        </Menu>
      </Layout.Sider>
    )
  }
}
export default Sider