import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { promiseReducer } from './promiseReduser'
import { authReducer, snakeReducer } from './reduser'
import tableReducer from './tableReducer'

const combineReduser = combineReducers({
  promise: promiseReducer,
  table: tableReducer,
  score: snakeReducer,
  user: authReducer
})

export const store = createStore(combineReduser, applyMiddleware(thunk))


