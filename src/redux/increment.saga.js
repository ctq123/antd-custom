import { put, takeEvery, call, takeLatest } from 'redux-saga/effects'
import { increment } from '../api/increment.api'

export function* incrementAsync(obj) {
  console.log("incrementAsync obj", obj)
  const resp = yield call(increment, obj.payload)
  console.log("resp", resp)
  yield put({ type: 'INCREMENT_ASYNC_SUCCESS', payload: resp.data })
}

export function* watchIncrementAsync() {
  console.log("watchIncrementAsync")
  yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}
