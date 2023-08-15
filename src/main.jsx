import React from 'react'
import ReactDOM from 'react-dom/client'
import { TasksApp } from './TasksApp.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
      <TasksApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
