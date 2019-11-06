import { getCookie, clearCookie } from '@utils/handleCookie'

/**
 * 转跳认证登陆系统
 */
export function toLoginPage() {
  location.href = `${AUTH_SERVICE}/auth/login`
}

/**
 * 登出操作
 */
export function logout() {
  const token = getCookie('token')
  // 清空数据
  sessionStorage.clear()
  clearCookie('token')
  // 登出转跳
  location.href = `${AUTH_SERVICE}/auth/logout?token=${token}`
}