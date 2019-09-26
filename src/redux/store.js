import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import reducer from './rootReducer'
import sagas from './rootSaga' 

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

export default store