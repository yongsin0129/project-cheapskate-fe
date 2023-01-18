import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'

import { App } from './App'
import ContextManager from './context'

import './style/main.scss'

// ContextManager 管理 context
// App 管理 routes 及 page component
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ContextManager>
      <App />
    </ContextManager>
  </React.StrictMode>
)
