import { login } from './index.api'
import { devSetCookieToken } from '@utils/handleCookie'

const model = {
  // model名称，view层用于提取state的key，需要保证唯一
  name: 'login',
  // 初始state状态
  state: {
    loading: false,
    loginStatus: sessionStorage.getItem('username'), // 防止刷新页面丢失登陆状态
    errMsg: '',
  },
  // reducer
  reducers: {
    'login': (state) => {
      return { ...state, loading: true, errMsg: '' }
    },
    'login/sucess': (state, action) => {
      const { username } = action.payload || {}
      if (username) {
        // 设置本地开发环境cookie的token
        devSetCookieToken()
        // 设置用户名，即登陆状态
        sessionStorage.setItem('username', username)
      }
      return { 
        ...state, 
        loginStatus: username ? username : '', 
        loading: false,
      }
    },
    'login/fail': (state, action) => {
      const { errMsg } = action.payload || {}
      return { ...state, loginStatus: '', loading: false, errMsg }
    },
    'login/logout': (state) => {
      sessionStorage.removeItem('username')
      return { ...state, loginStatus: '' }
    },
    'login/resetData': (state, action) => {
      const payload = action.payload || {}
      return { ...state, ...payload }
    }
  },
  // saga
  effects: {
    'login': function*({ payload }, { call, put }) {
      const resp = yield call(login, payload)
      const { success, model } = resp && resp.data || {}
      if (resp && success) {
        console.log("resp", resp)
        yield put({ type: 'login/sucess', payload: model })
      } else {
        yield put({ type: 'login/fail', payload: { errMsg: '登陆失败！用户名或密码错误' } })
      }
    },
  },
}

export default model
