import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import CssBaseline from '@mui/material/CssBaseline'
import ContextManager from './context'

// 層級說明 :
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
