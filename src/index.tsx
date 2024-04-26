import 'regenerator-runtime/runtime'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { store, history } from './configureStore'

import App from 'components/App/App'

import '!style-loader!css-loader!styles/overrides/css-resetter.css' // eslint-disable-line
import * as React from 'react'

const rootEl = document.getElementById('app')
const root = createRoot(rootEl)

const renderApp = Component => {
  root.render(
    <Provider store={store}>
      <Router history={history}>
        <Component />
      </Router>
    </Provider>
  )
}

renderApp(App)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
