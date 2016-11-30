import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux'
import { AppContainer } from '~/containers'

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
)

export default function ReactModoro (props) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}