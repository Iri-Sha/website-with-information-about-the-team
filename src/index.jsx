import './index.less'
import React from 'react'
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import App from './components/App/App'
import { Provider } from 'react-redux'
import store from './store/store'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  </HashRouter>
)