import React from "react"
import { Route, Redirect } from 'react-router-dom'

/**
 * 根据index.menu.js配置生成路由
 * @param {用户权限列表} permList 
 */
export function generateRoute (permList=null) {
  // 读取所有index.menu.js文件
  const menus = require.context('../pages/tabs', true, /index\.menu\.js/)
  // 已有的菜单路由
  const existMenu = {}
  // 已生成有效的路由(菜单有，路由不一定有效，如包含二级菜单的一级菜单)
  const existRoute = {}
  // 若有自定义重定向的需要重新生成
  const redirectsTemp = []

  // 生成路由routes
  const routes = menus.keys().map(path => {
    const menu = menus(path).default
    const { menuKey, menuName, routeProps, redirectProps, permKey } = menu || {}
    if (menuKey && routeProps && routeProps.path) {
      if (!existMenu[menuKey] && !existRoute[routeProps.path]) {
        /**
         * 初始化阶段：用户还没获取到权限，permList为null，应生成全部路由，否则刷新页面时都会转跳到首页
         * 更新阶段：用户获取到权限，permList已更新，不为null，根据用户权限重新生成路由
         */
        if (!permList || permList.includes(permKey)) {
          existMenu[menuKey] = menu
          existRoute[routeProps.path] = menu
          if (redirectProps && redirectProps['to']) {
            redirectsTemp.push(redirectProps)
          }
          return <Route key={menuKey} { ...routeProps } />
        }
      } else if(existMenu[menuKey]) {
        const m = existMenu[menuKey]
        console.error(`警告：【${menuName}-${menuKey}】菜单无效！已存在相同的菜单ID【${m.menuName}-${m.menuKey}】，请在index.menu.js中重置menuKey！`)
      } else {
        const m = existRoute[routeProps.path]
        console.error(`警告：【${menuName}-${routeProps.path}】路由无效！已存在相同的路由路径【${m.menuName}-${m.routeProps.path}】，请在index.menu.js中重置routeProps.path！`)
      }
    } else {
      console.error(`警告：【${menuName}-${menuKey}】菜单路由无效！menuKey，routeProps，routeProps.path不能为空！`)
    }
  })
  // Redirect重定向需要放到最底部
  // 先对path长度进行排序，因为redirect中from字段匹配到马上返回，因此from字段越长越靠前
  const compare = (prop) => {
    return (obj1, obj2) => {
      return (obj1[prop] || '').length - (obj2[prop] || '').length
    }
  }
  const redirectsArr = redirectsTemp.sort(compare('from'))
  // 生成重定向路由
  const redirects = redirectsArr.map((item, index) => {
    if (item && item['to']) {
      return <Redirect key={item['from'] || index} { ...item } />
    }
  })
  return { routes, existRoute, redirects }
}

/**
 * 自定义key，生成菜单map类型
 * @param {menus唯一属性值，如'key','path'} key 
 * @param {menus数据} menuList 
 */
export function getMenusMap(key = 'key', menuList=[]) {
  const menusMap = {}
  const generateMap = (list) => {
    list.map(item => {
      if (item) {
        const { children } = item
        if (children && children.length) {
          generateMap(children)
        }
        menusMap[item[key]] = item
      }
    })
  }
  generateMap(menuList)
  return menusMap
}