import { gql } from '@apollo/client'

export const hello_apollo_server = gql`
  query Query {
    hello
  }
`
