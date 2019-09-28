import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

// 用于缓存所有reducer（即state）
const reducer = {}
// 读取所有.model.js结尾的文件
const models = require.context('../', true, /\.model\.js$/)
// console.dir(models)
models.keys().map(path => {
  // 引入model
  path = path.replace(/^(\.\/)/g, '')
  const item = require('../' + path).default
  // console.dir(item)
  // 对每个model进行操作-处理对应的state和reducer
  if (item && item.name) {
    const { name, state={}, reducers={} } = item
    // 使用handleActions整合所有的reducer函数
    reducer[name] = handleActions(reducers, state)
  }
})

const rootReducer = combineReducers({
  ...reducer,
})

export default rootReducer
