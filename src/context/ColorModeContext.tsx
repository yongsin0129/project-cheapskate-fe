import React from 'react'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})

export const ColorSwitchManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // state
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  
  // optimization
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

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
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
