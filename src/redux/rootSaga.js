import { fork, all } from 'redux-saga/effects'

function* hello() {
  console.log("hello")
}

export default function *rootSaga() {
  yield all([
    hello()
  ])
}