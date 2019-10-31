import axios from 'axios'
import { notification } from 'antd'
import { logout } from '@utils/handleLogin'

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 网络异常拦截器
const errorHandler = (resp) => {
  if (resp) {
    const { status, statusText, config } = (resp && resp.response) || {}
    const errorText = codeMessage[status] || statusText
    notification.error({
      message: `请求错误 ${status}: ${config.url}`,
      description: errorText,
    })
    switch (status) {
      case 401:
        // 没有认证
        setTimeout(()=> {
          // 登出
          logout()
        }, 1000)
        break
      default:
        break
    }
  } else {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    })
  }
  return Promise.reject(resp)
}

// 业务错误拦截器，暂时不使用
const failHandler = (resp) => {
  const { data } = resp || {}
  if (data && data.hasOwnProperty('success') && data.hasOwnProperty('firstErrorMessage')) {
    if (data.success) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data.firstErrorMessage)
    }
  } else {
    // 非法
    return Promise.reject(resp)
  }
}

export function setAxiosToken(token) {
  axios.defaults.headers.common['Authorization'] = token
}

export function setAxiosBase() {
  axios.defaults.baseURL = ''
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.withCredentials = true
  axios.interceptors.response.use((resp) => {
    return Promise.resolve(resp)
  }, errorHandler)
}

export default setAxiosBase