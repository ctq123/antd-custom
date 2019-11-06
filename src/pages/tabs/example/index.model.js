import { increment } from './index.api'

const model = {
  // model名称，view层用于提取state的key，需要保证唯一
  name: 'example',
  // 初始state状态
  state: {
    loading: false,
    count: 0,
  },
  // reducer
  reducers: {
    'example/increment': function(state, action) {
      const { payload } = action
      return { ...state, count: state.count + payload }
    },
    'example/increment/async': function(state) {
      return { ...state, loading: true }
    },
    'example/increment/async/success': function(state, action) {
      const { payload } = action
      return { ...state, loading: false, count: state.count + payload }
    },
    'example/increment/async/fail': function(state, action) {
      return { ...state, loading: false }
    },
  },
  // saga
  effects: {
    'example/increment/async': function*({ payload }, { call, put }) {
      const resp = yield call(increment, payload)
      if (resp) {
        yield put({ type: 'example/increment/async/success', payload: resp })
      } else {
        yield put({ type: 'example/increment/async/fail' })
      }
    },
  },
}

export default model
