import utils from '@utils'
import { cloneDeep } from 'lodash'

/**
 * 根据用户拥有的菜单权限过滤菜单列表
 * @param {原菜单列表} menuList 
 * @param {用户拥有的权限列表} permList 
 */
export function getMenuListByPermission(menuList=[], permList=[]) {
  const newMenuList = cloneDeep(menuList)
  const filterPermission = (item) => {
    // 根据菜单权限permKey值判断是否拥有权限
    let { children, permKey } = item || {}
    if (Array.isArray(children) && children.length) {
      // tips:这里会改变原数组
      item.children = children.filter(filterPermission)
    }
    // 特殊需求，只要存在子菜单，父菜单就一定有效（不必校验父菜单是否有权限）
    if (item.children && item.children.length) {// item.children与children已不是同一个值
      return true
    }
    // 检测是否拥有权限
    return utils.checkAccessPermission(permKey, permList)
  }
  return newMenuList.filter(filterPermission)
}