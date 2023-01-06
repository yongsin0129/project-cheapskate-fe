import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/dist/main.css'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import ContextManager2 from './context'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as helper from './helper'

// // ---------------------- context create ----------------------
// export const MeContext = React.createContext([] as any[])
// export const ReactContext = React.createContext<ReactContext>({})

// const ContextManager: React.FC<React.PropsWithChildren> = ({ children }) => {
//   // ---------------------- variable initial ----------------------
//   const token = helper.getToken()?.data || null
//   const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

//   const client_init = new ApolloClient({
//     uri: import.meta.env.VITE_graphql_endPoint,
//     cache: new InMemoryCache(),
//     headers: { ...jwt_token } // 初始化就帶 jwt_Token or null
//   })

//   // ---------------------- useState ----------------------
//   const [client, setClient] = React.useState(client_init)
//   const [MeToken, setMeToken] = React.useState(jwt_token)
//   const [Me, setMe] = React.useState<any>()
//   const [myFollowedMovie, setMyFollowedMovie] =
//     React.useState<MovieDataResponsive[]>()
//   const [appBarState, setAppBarState] = React.useState<PageState>()
//   const [homePageState, setHomePageState] = React.useState<PageState>()








//   // ---------------------- useEffect ----------------------
//   // context_MeToken 有變化後觸發， new 一個新的 apollo client 並且更新 Me
//   React.useEffect(() => {
//     setAppBarState({ isLoading: true })

//     console.log('MeToken 發生變化，觸發 useEffect 更新 setClient , setMe')
//     console.log(MeToken)
//     const token = helper.getToken()?.data || null
//     const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

//     setClient(
//       new ApolloClient({
//         uri: import.meta.env.VITE_graphql_endPoint,
//         cache: new InMemoryCache(),
//         headers: { ...jwt_token }
//       })
//     )

//     if (!!jwt_token) updateMe()
//     else {
//       setMe(null)
//       setAppBarState({ isLoading: false })
//     }

//     // 更新 context_Me
//     async function updateMe () {
//       const value = await helper.transferTokenToMe()
//       console.log(' useEffect 裡面的 asyncFN value : ')
//       console.log(value)
//       if (!!value.success) setMe(value.data)
//       if (!value.success) {
//         if (value.message?.includes('too many connections')) {
//           setHomePageState({
//             isError: true,
//             message: helper.ErrorMessageTransfer(value.message)
//           })
//         } else {
//           setHomePageState({ isError: true, message: value.message })
//         }
//       }
//       setAppBarState({ isLoading: false })
//     }
//   }, [MeToken])

//   // ---------------------- return structure ----------------------
//   return (
//     <ApolloProvider client={client}>
//       <MeContext.Provider value={[MeToken, setMeToken, Me, setMe]}>
//         <ReactContext.Provider
//           value={{
//             myFollowedMovie,
//             setMyFollowedMovie,
//             appBarState,
//             homePageState,
//             setHomePageState
//           }}
//         >
//           {children}
//         </ReactContext.Provider>
//       </MeContext.Provider>
//     </ApolloProvider>
//   )
// }

// 層級說明 :
// ContextManager 管理 context
// App 管理 routes 及 page component

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ContextManager2>
      {/* <ContextManager> */}
      <App />
      {/* </ContextManager> */}
    </ContextManager2>
  </React.StrictMode>
)
