import { fork, all } from 'redux-saga/effects'

import { watchIncrementAsync } from './increment.saga'

export default function *rootSaga() {
  yield all([
    watchIncrementAsync()
  ])
}