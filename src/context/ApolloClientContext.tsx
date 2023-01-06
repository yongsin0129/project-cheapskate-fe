import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'

// ------------------------------     create context   ------------------------------
// export const ApolloClientContext = React.createContext({})

// ---------------------- variable initial ----------------------
// const token = helper.getToken()?.data || null
// const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

const client = new ApolloClient({
  uri: import.meta.env.VITE_graphql_endPoint,
  cache: new InMemoryCache(),
  // headers: { ...jwt_token } // 初始化就帶 jwt_Token or null
})

export const ApolloClientManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
