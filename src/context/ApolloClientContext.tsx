import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_graphql_endPoint,
  cache: new InMemoryCache()
})

export const ApolloClientManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
