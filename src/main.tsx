import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})

const AppManager = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

// 層級
// AppManager / App
// AppManger 管理 context
// App 管理 page and component

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <AppManager />
  </React.StrictMode>
)
