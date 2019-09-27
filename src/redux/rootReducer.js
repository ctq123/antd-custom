import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import incrementReducer from './increment.reducer'

const reducer = {}
const models = require.context('../', true, /\.model\.js$/)
// console.dir(models)
models.keys().map(path => {
  path = path.replace(/^(\.\/)/g, '')
  const item = require('../' + path).default
  // console.dir(item)
  if (item && item.name) {
    const { name, state={}, reducers={} } = item
    reducer[name] = handleActions(reducers, state)
  }
})

const rootReducer = combineReducers({
  incrementReducer,
  ...reducer,
})

export default rootReducer
