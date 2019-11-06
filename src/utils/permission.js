/**
 * 检查用户是否拥有对应的权限
 * @param {对应功能权限的key值} permkey 
 * @param {用户权限列表} permList 
 */
export function checkAccessPermission(permkey, permList=[]) {
  // 特殊配置
  if (permkey === true) {
    return true
  }
  if (permkey) {
    if (!permList.length || !Array.isArray(permList)) {// 权限列表为空或非数组
      const permStr = sessionStorage.getItem('permission')
      permList = permStr ? JSON.parse(permStr) : []
    }
    return permList.includes(permkey)
  }
  return false
}