import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { getMenusMap } from '@menus/menu.route'
import { injectIntl } from 'react-intl'
import Connect from '@components/hoc/Connect'


const BreadcrumbItem = Breadcrumb.Item 
/**根据输入url切割成面包屑 */
class Breadcrumbs extends PureComponent {
  constructor(props) {
    super(props)
    // console.log("props", props)
    const { path } = props.match
    this.historyListener(props.history)
    this.menusPathMap = getMenusMap('path', props.menuList)
    this.routePathMap = props.existRoute
    this.state = {
      menuLen: 0,
      items: this.getItems(path),
    }
  }

  componentDidUpdate() {
    const { menuList, match, existRoute } = this.props
    // console.log("this.props", this.props)
    if (menuList && menuList.length != this.state.menuLen) {
      this.menusPathMap = getMenusMap('path', menuList)
      this.routePathMap = existRoute
      this.setState({
        menuLen: menuList.length,
        items: this.getItems(match.path)
      })
    }
  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  historyListener = (history) => {
    // 处理输入url地址，触发面包屑变化
    this.unlisten = history && history.listen(() => {
      const { path } = this.props.match
      // console.log("Breadcrumbs path", path)
      if (path) {
        this.setState({
          items: this.getItems(path)
        })
      }
    })
  }

  getItems = (pathname) => {
    const paths = (pathname || '').split('/')
    const keys = []
    const names = []
    const trans = []

    if (paths && paths.length > 2) {
      for(let i = 2; i <= paths.length; i++) {
        let p = paths.slice(0, i).join('/')
        if (this.menusPathMap[p]) {
          const { name, transKey } = this.menusPathMap[p]
          keys.push(p)
          trans.push(transKey)
          names.push(name)
        } else if (this.routePathMap[p]) {
          const { name, transKey } = this.routePathMap[p]
          keys.push(p)
          trans.push(transKey)
          names.push(name)
        }
      }
    }
    return this.generateItem(keys, trans, names)
  }

  generateItem = (keys, trans, names) => {
    const { intl } = this.props
    if (!keys || keys.length < 1 || (keys.length === 1 && keys[0] === '/app')) {
      return <BreadcrumbItem>{intl.formatMessage({ id: 'Home' })}</BreadcrumbItem>
    } else {
      const n = keys.length - 1
      return keys.map((key, index) => {
        const id = trans[index]
        const name = names[index] || ''
        if (key) {
          return index < n 
          ? <BreadcrumbItem key={ key }><Link to={ key }>{ id ? intl.formatMessage({ id }) : name }</Link></BreadcrumbItem>
          : <BreadcrumbItem key={ key }>{ id ? intl.formatMessage({ id }) : name }</BreadcrumbItem>
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

export default Connect(injectIntl(withRouter(Breadcrumbs)), ({ app }) => (app))