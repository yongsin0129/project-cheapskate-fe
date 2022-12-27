import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as helper from './helper'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})
export const MovieDataContext = React.createContext([] as any[])
export const MeTokenContext = React.createContext([] as any[])

const ContextManager = () => {
  // ---------------------- apollo client initial ----------------------
  const client_init = new ApolloClient({
    uri: import.meta.env.VITE_graphql_endPoint,
    cache: new InMemoryCache(),
    headers: helper.getToken() ? { jwt_token: helper.getToken() } : {}
  })

  // ---------------------- useState ----------------------
  const [client, setClient] = React.useState(client_init)
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const [MeToken, setMeToken] = React.useState({})
  const [MovieData, setMovieData] = React.useState<MovieData>({})

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  // ---------------------- useMemo ----------------------
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  // ---------------------- useEffect ----------------------
  // context_MeToken 有變化後觸發， new 一個新的 apollo client
  React.useEffect(() => {
    console.log('MeToken 發生變化，觸發 useEffect')
    console.log(MeToken)

    setClient(
      new ApolloClient({
        uri: import.meta.env.VITE_graphql_endPoint,
        cache: new InMemoryCache(),
        headers: helper.getToken() ? { jwt_token: helper.getToken() } : {}
      })
    )
  }, [MeToken])

  // ---------------------- return structure ----------------------
  return (
    <ApolloProvider client={client}>
      <MeTokenContext.Provider value={[MeToken, setMeToken]}>
        <MovieDataContext.Provider value={[MovieData, setMovieData]}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </MovieDataContext.Provider>
      </MeTokenContext.Provider>
    </ApolloProvider>
  )
}

// 層級  ContextManager / App
// 層級說明 :
// ContextManager 管理 context
// App 管理 routes , page component

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ContextManager />
  </React.StrictMode>
)
