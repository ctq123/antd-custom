import { increment } from './index.api'

const model = {
  name: 'home',
  state: {
    loading: false,
    count: 0,
  },
  reducers: {
    'home/increment': function(state, action) {
      return { ...state, loading: true }
    },
    'home/increment/success': function(state, action) {
      const { payload } = action
      return { ...state, loading: false, count: state.count + payload }
    },
  },
  effects: {
    'home/increment': function*({ payload }, { call, put }) {
      const resp = yield call(increment, payload)
      if (resp) {
        console.log("resp", resp)
        yield put({ type: 'home/increment/success', payload: resp.data })
      } else {
        throw resp
      }
    },
  },
}

export default model
