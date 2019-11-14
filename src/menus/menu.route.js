import React from "react"
import { Route, Redirect } from 'react-router-dom'
import { cloneDeep } from 'lodash'

/**
 * 根据index.route.js配置生成路由
 * @param {用户菜单列表} menuList
 * @param {用户权限列表} permList 
 */
export function generateRoute (menuList = [], permList=null) {
  // 防止修改原数组
  const menuListTmp = cloneDeep(menuList)
  // 读取所有index.route.js文件
  const routeList = require.context('../pages/tabs', true, /index\.route\.js/)
  // 已生成有效的路由(菜单有，路由不一定有效，如包含二级菜单的一级菜单)
  const existRoute = {}
  // 若有自定义重定向的需要重新生成
  const redirectsTemp = []

  // 生成路由routes
  const routes = routeList.keys().map((path) => {
    const route = routeList(path).default
    const { name, routeProps, permKey, transKey='' } = route || {}
    if (routeProps && routeProps.path) {
      const key = routeProps.path
      if (!existRoute[key]) {
        /**
         * 初始化阶段：用户还没获取到权限列表，permList为null，应生成全部路由，否则刷新页面时都会转跳到首页
         * 更新阶段：用户获取到权限列表，permList已更新，不为null，根据用户权限列表重新生成路由
         */
        if (!permList || permKey === true || permList.includes(permKey)) {
          existRoute[key] = { name, transKey, routeProps: { path: key } }
          return <Route key={key} exact={true} { ...routeProps } />
        }
      } else {
        const m = existRoute[key]
        console.error(`警告：【${name}-${key}】路由无效！已存在相同的路由【${m.name}-${m.routeProps.path}】，请在index.route.js中重置routeProps.path！`)
      }
    } else {
      console.error(`警告：【${name}】路由无效！routeProps，routeProps.path不能为空！`)
    }
  })

  // 根据用户菜单列表，自动生成转跳Redirect
  const filterRedirect = (item) => {
    const { children, path } = item || {}
    let valid = false
    // 校验子菜单
    if (Array.isArray(children) && children.length) {
      valid = true
      const redirectProps = {
        from: path,
        to: children[0].path
      }
      // 真正有效重定向路由
      redirectsTemp.push(redirectProps)
      // tips:这里会改变原数组
      item.children = children.filter(filterRedirect)
    }
    return valid
  }

  // 过滤菜单，生成重定向路由
  menuListTmp.filter(filterRedirect)

  // Redirect重定向需要放到最底部
  // 先对path长度进行排序，因为redirect中from字段匹配到马上返回，因此from字段越长越靠前
  const compare = (prop) => {
    return (obj1, obj2) => {
      const len1 = (obj1[prop] || '').split('/').length
      const len2 = (obj2[prop] || '').split('/').length 
      return len1 - len2
    }
  }
  // 重新排序
  const redirectsArr = redirectsTemp.sort(compare('from'))
  // 生成重定向路由
  const redirects = redirectsArr.map((item, index) => {
    if (item && item['from']) {
      return <Redirect key={item['from'] || index} { ...item } />
    }
  })
  return { routes, existRoute, redirects }
}

/**
 * 自定义key，生成菜单map类型
 * @param {menus唯一属性值，如'path'} key 
 * @param {menus数据} menuList 
 */
export function getMenusMap(key = 'path', menuList=[]) {
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

/**
 * 过滤无效菜单
 * @param {*} key 
 * @param {*} menuList 
 */
export function getValidMenuList(key = 'path', menuList=[]) {
  const newMenuList = cloneDeep(menuList)
  // 已存在的菜单
  const existMenu = {}
  const filterMenus = (item) => {
    // 根据菜单path值判断是否拥有相同菜单
    const { children, name, path } = item || {}
    const id = item ? item[key] : ''
    const valid = !existMenu[id]
    valid && id && (existMenu[id] = item)
    // 校验子菜单
    if (Array.isArray(children) && children.length) {
      // tips:这里会改变原数组
      item.children = children.filter(filterMenus)
    }
    if (id) {
      if (!valid) {
        const m = existMenu[id]
        console.error(`警告：【${name}-${path}】菜单无效！已存在相同的路径菜单【${m.name}-${m.path}】，请在menu.data.js中重置path！`)
      }
    }
    
    return valid
  }
  return newMenuList.filter(filterMenus)
}