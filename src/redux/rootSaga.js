import { fork, all, put, call, takeLatest, select  } from 'redux-saga/effects'

import { watchIncrementAsync } from './increment.saga'

const sagas = []
const models = require.context('../', true, /\.model\.js$/)

models.keys().map(path => {
  path = path.replace(/^(\.\/)/g, '')
  const item = require('../' + path).default
  // console.dir(item)
  if (item && item.effects) {
    const { effects } = item
    for(let key in effects) {
      const watch = function* () {
        // console.log("watch", watch)
        yield takeLatest(key, function*(obj) {
          // 第二个参数只传递了最常用的call,put进去，
          // 如果想用更多其他'redux-saga/effects'的API，可在各自model中自行引入
          // console.log("takeLatest-key", key)
          // console.log("takeLatest-obj", obj)
          yield effects[key](obj, { call, put })
        })
      }
      sagas.push(watch())
    }
  }
})

// console.log("sagas", sagas)
const arr = [ watchIncrementAsync() ].concat(sagas)

export default function *rootSaga() {
  yield all(arr)
}