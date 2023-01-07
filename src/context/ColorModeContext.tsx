import React from 'react'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'
import * as helper from '../helper'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})

export const ColorSwitchManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // debug 專用
  helper.debugTool.traceStack(ColorSwitchManager)

  // ------------------------------     useState   ------------------------------
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  // ------------------------------     useMemo   ------------------------------
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  // mode 改變時，會重新創造一個 MUI theme 傳下去所有子元件
  const theme = React.useMemo(() => {
    let theme = createTheme({
      palette: {
        mode
      }
    })
    return responsiveFontSizes(theme)
  }, [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
