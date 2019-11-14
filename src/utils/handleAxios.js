import axios from 'axios'
import { logout } from '@utils/handleLogin'

// 网络异常拦截器
const errorHandler = (resp) => {
  const { status } = (resp && resp.response) || {}
  switch (status) {
    case 401:
      // 没有认证
      logout()
      break
    default:
      break
  }
  return Promise.reject(resp)
}

// 业务处理拦截器
const responseHandler = (resp) => {
  const { data } = resp || {}
  if (data && data.hasOwnProperty('success')) {
    if (data.success) {
      return Promise.resolve(data['model'])
    } else {
      return Promise.reject(data)
    }
  } else {
    return Promise.resolve(resp)
  }
}

export function setAxiosToken(token) {
  axios.defaults.headers.common['Authorization'] = token
}

export function setAxiosBase() {
  axios.defaults.baseURL = ''
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
  axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8'
  axios.defaults.withCredentials = true
  axios.interceptors.response.use(responseHandler, errorHandler)
}

export default setAxiosBase