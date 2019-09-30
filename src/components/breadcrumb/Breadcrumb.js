import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { getMenusMap } from '../../menus/index'
import { injectIntl } from 'react-intl'
import { translateText } from '../../utils/translate'

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
      // console.log("Breadcrumbs location", location)
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

    if (paths && paths.length > 2) {
      for(let i = 2; i <= paths.length; i++) {
        let p = paths.slice(0, i).join('/')
        if (menusPathMap[p]) {
          const { path, name } = menusPathMap[p]
          keys.push(path)
        }
      }
    }
    return this.generateItem(keys)
  }

  generateItem = (keys) => {
    if (!keys || keys.length < 1 || (keys.length === 1 && keys[0] === '/app')) {
      return <BreadcrumbItem>{translateText({ id: '/app' })}</BreadcrumbItem>
    } else {
      const n = keys.length - 1
      return keys.map((key, index) => {
        if (key) {
          return index < n 
          ? <BreadcrumbItem key={ key }><Link to={ key }>{ translateText({ id: key }) }</Link></BreadcrumbItem>
          : <BreadcrumbItem key={ key }>{ translateText({ id: key }) }</BreadcrumbItem>
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

export default injectIntl(Breadcrumbs)