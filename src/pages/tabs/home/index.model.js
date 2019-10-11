import { increment } from './index.api'

const model = {
  // model名称，view层用于提取state的key，需要保证唯一
  name: 'home',
  // 初始state状态
  state: {
    loading: false,
    count: 0,
  },
  // reducer
  reducers: {
    'home/increment': function(state, action) {
      const { payload } = action
      return { ...state, count: state.count + payload }
    },
    'home/increment/async': function(state) {
      return { ...state, loading: true }
    },
    'home/increment/async/success': function(state, action) {
      const { payload } = action
      return { ...state, loading: false, count: state.count + payload }
    },
    'home/increment/async/fail': function(state, action) {
      return { ...state, loading: false }
    },
  },
  // saga
  effects: {
    'home/increment/async': function*({ payload }, { call, put }) {
      const resp = yield call(increment, payload)
      if (resp) {
        console.log("resp", resp)
        const { model, success } = (resp && resp.data) || {}
        if (success) {
          yield put({ type: 'home/increment/async/success', payload: model })
        } else {
          yield put({ type: 'home/increment/async/fail' })
        }
      } else {
        yield put({ type: 'home/increment/async/fail' })
      }
    },
  },
}

export default model
