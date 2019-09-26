// import { login } from 'api'

// const model = {
//   state: {
//     loading: false,
//     status: '',
//   },
//   reducers: {
//     'login/login'(state, action) {
//       const { payload } = action
//       return { ...state, ...payload, loading: true }
//     },
//     'login/login/success'(state, action) {
//       const { payload } = action
//       return { ...state, ...payload, loading: false, status: 'login' }
//     },
//   },
//   effects: {
//     *login({ payload }, { call, put }) {
//       const data = yield call(login, payload)
//       if(data) {
//         yield put({
//           type: 'login/login/success',
//           payload: { list: data.data }
//         })
//       }
//     },
//   },
// }

// export default model
