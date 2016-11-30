import React from 'react'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import * as reducers from './redux'
import { AppContainer } from '~/containers'

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    devTools()
  )
)

export default function ReactModoro (props) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}