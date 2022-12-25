import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_graphql_endPoint,
  cache: new InMemoryCache(),
  headers: {
    'cheapskate-token': import.meta.env.VITE_cheapskate_token
  }
})

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})

const MovieData: MovieData = {
  firstRound: null,
  leaveFirstRound: null,
  secondRound: null,
  leaveSecondRound: null,
  notReleased: null,
  streaming: null,
  MyFollowedMovie: null
}
export const MovieDataContext = React.createContext(MovieData)

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
    <ApolloProvider client={client}>
      <MovieDataContext.Provider value={MovieData}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </MovieDataContext.Provider>
    </ApolloProvider>
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
