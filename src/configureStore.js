import { configureStore } from '@reduxjs/toolkit'
import { createReduxHistoryContext } from 'redux-first-history'

import { createBrowserHistory } from 'history'

import reducers from './rootReducer'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
})

const loadingLockMiddleware = () => next => action => {
  if (action.loadingLock === 'on') {
    document.body.style.cursor = 'wait'
    document.getElementById('app').style.pointerEvents = 'none'
  } else if (action.loadingLock === 'off') {
    document.body.style.cursor = 'default'
    document.getElementById('app').style.pointerEvents = 'auto'
  }

  next(action)
}

const middleware = [loadingLockMiddleware, routerMiddleware]

if (process.env.ENV !== 'production') {
  const logger = require('redux-logger').default
  middleware.push(logger)
}

export const store = configureStore({
  reducer: {
    ...reducers,
    router: routerReducer
  },
  middleware
})

export const history = createReduxHistory(store)
