import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { getMenusMap } from '../../menus/index'

const menusPathMap = getMenusMap('path')

const BreadcrumbItem = Breadcrumb.Item 
class Breadcrumbs extends PureComponent {
  constructor(props) {
    super(props)
    const { pathname } = (props.history && props.history.location) || {}
    this.historyListener(props.history)
    this.state = {
      items: this.getItems(pathname),
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  historyListener = (history) => {
    // 处理输入url地址，触发面包屑变化
    this.unlisten = history && history.listen(location => {
      const { pathname } = location || {}
      if (pathname) {
        let items = this.getItems(pathname)
        this.setState({
          items
        })
      }
    })
  }

  getItems = (pathname) => {
    const paths = (pathname || '').split('/')
    const keys = []
    const label = []

    if (paths && paths.length > 2) {
      for(let i = 2; i <= paths.length; i++) {
        let p = paths.slice(0, i).join('/')
        if (menusPathMap[p]) {
          const { path, name } = menusPathMap[p]
          keys.push(path)
          label.push(name)
        }
      }
    }
    return this.generateItem(keys, label)
  }

  generateItem = (keys, label) => {
    if (!keys || keys.length < 1 || (keys.length === 1 && keys[0] === '/app')) {
      return <BreadcrumbItem>首页</BreadcrumbItem>
    } else {
      const n = keys.length - 1
      return keys.map((key, index) => {
        if (key) {
          return index < n 
          ? <BreadcrumbItem key={ key }><Link to={ key }>{ label[index] }</Link></BreadcrumbItem>
          : <BreadcrumbItem key={ key }>{ label[index] }</BreadcrumbItem>
        }
      })
    }
  }

  render() {
    return (
      <Breadcrumb>
        { this.state.items }
      </Breadcrumb>
    )
  }
}

export default Breadcrumbs