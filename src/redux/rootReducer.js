import { combineReducers } from 'redux'
import incrementReducer from './increment.reducer'

const rootReducer = combineReducers({
  incrementReducer,
})

export default rootReducer
