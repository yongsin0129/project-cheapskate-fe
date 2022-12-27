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
  const MeToken_init = helper.getToken()
    ? { jwt_token: helper.getToken()! }
    : undefined

  const client_init = new ApolloClient({
    uri: import.meta.env.VITE_graphql_endPoint,
    cache: new InMemoryCache(),
    headers: MeToken_init // 初始化就帶 jwt_Token or null
  })

  // ---------------------- useState ----------------------
  const [client, setClient] = React.useState(client_init)
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const [MeToken, setMeToken] = React.useState(MeToken_init)
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
  // context_MeToken 有變化後觸發， new 一個新的 apollo client
  React.useEffect(() => {
    console.log('MeToken 發生變化，觸發 useEffect 更新 setClient')
    console.log(MeToken)
    setClient(
      new ApolloClient({
        uri: import.meta.env.VITE_graphql_endPoint,
        cache: new InMemoryCache(),
        headers: helper.getToken() ? { jwt_token: helper.getToken()! } : {}
      })
    )

    // setMe() // useEffect 裡面不知道為什麼沒有辦法用 async callback function ，先用 TransferTokenToMe FC 做 workaround
    const asyncFN = async () => {
      const value = await helper.transferTokenToMe()
      console.log(' useEffect 裡面的 asyncFN value : ')
      console.log(value)
      setMe(value)
    }
    asyncFN()

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
