import { put, takeEvery, call } from 'redux-saga/effects'
import { increment } from './increment.api'

export function* incrementAsync({ type, payload }) {
  const resp = yield call(increment, payload)
  console.log("resp", resp)
  yield put({ type: 'INCREMENT_ASYNC_SUCCESS', payload: resp.data })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}