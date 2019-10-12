import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { getMenusMap } from '@menus/menu.route'
import { injectIntl } from 'react-intl'
import { translateText } from '@utils/translate'


const BreadcrumbItem = Breadcrumb.Item 
class Breadcrumbs extends PureComponent {
  constructor(props) {
    super(props)
    const { pathname } = (props.history && props.history.location) || {}
    this.historyListener(props.history)
    this.menusPathMap = getMenusMap('path', props.menuList)
    this.state = {
      menuLen: 0,
      items: this.getItems(pathname),
    }
  }

  componentDidUpdate() {
    const { menuList, history } = this.props
    if (menuList && menuList.length != this.state.menuLen) {
      this.menusPathMap = getMenusMap('path', menuList)
      const { pathname } = (history && history.location) || {}
      this.setState({
        menuLen: menuList.length,
        items: this.getItems(pathname)
      })
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
        this.setState({
          items: this.getItems(pathname)
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
        if (this.menusPathMap[p]) {
          const { path, name } = this.menusPathMap[p]
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