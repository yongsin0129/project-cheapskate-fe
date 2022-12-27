import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as helper from './helper'

// ---------------------- context create ----------------------
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})
export const MovieDataContext = React.createContext([] as any[])
export const MeContext = React.createContext([] as any[])

const ContextManager = () => {
  // ---------------------- variable initial ----------------------
  const token = helper.getToken()?.data || null
  const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

  const client_init = new ApolloClient({
    uri: import.meta.env.VITE_graphql_endPoint,
    cache: new InMemoryCache(),
    headers: { ...jwt_token } // 初始化就帶 jwt_Token or null
  })

  // ---------------------- useState ----------------------
  const [client, setClient] = React.useState(client_init)
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const [MeToken, setMeToken] = React.useState(jwt_token)
  const [Me, setMe] = React.useState<any>()
  const [MovieData, setMovieData] = React.useState<MovieData>({})

  // ---------------------- useMemo ----------------------
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

  // ---------------------- useEffect ----------------------
  // context_MeToken 有變化後觸發， new 一個新的 apollo client 並且更新 Me
  React.useEffect(() => {
    console.log('MeToken 發生變化，觸發 useEffect 更新 setClient , setMe')
    console.log(MeToken)
    const token = helper.getToken()?.data || null
    const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

    setClient(
      new ApolloClient({
        uri: import.meta.env.VITE_graphql_endPoint,
        cache: new InMemoryCache(),
        headers: { ...jwt_token }
      })
    )

    // 更新 context_Me
    ;(async () => {
      const value = await helper.transferTokenToMe()
      console.log(' useEffect 裡面的 asyncFN value : ')
      console.log(value)
      setMe(value.data)
    })()
  }, [MeToken])

  // ---------------------- return structure ----------------------
  return (
    <ApolloProvider client={client}>
      <MeContext.Provider value={[MeToken, setMeToken, Me, setMe]}>
        <MovieDataContext.Provider value={[MovieData, setMovieData]}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </MovieDataContext.Provider>
      </MeContext.Provider>
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
