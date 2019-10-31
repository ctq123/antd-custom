import { checkAccessPermission } from '@utils/permission'
import _ from 'lodash'

/**
 * 根据用户拥有的菜单权限过滤菜单列表
 * @param {原菜单列表} menuList 
 * @param {用户拥有的权限列表} permList 
 */
export function getMenuListByPermission(menuList=[], permList=[]) {
  const newMenuList = _.cloneDeep(menuList)
  const filterPermission = (item) => {
    // 根据菜单权限permKey值判断是否拥有权限
    let { children, permKey } = item || {}
    if (Array.isArray(children) && children.length) {
      // tips:这里会改变原数组
      item.children = children.filter(filterPermission)
    }
    return checkAccessPermission(permKey, permList)
  }
  return newMenuList.filter(filterPermission)
}