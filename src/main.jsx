import React from 'react'
import ReactDOM from 'react-dom/client'
import { TasksApp } from './TasksApp.jsx'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <TasksApp />
          </NextThemesProvider>
        </NextUIProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
