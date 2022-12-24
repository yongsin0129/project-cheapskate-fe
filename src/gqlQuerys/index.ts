import { gql } from '@apollo/client'

export const hello_apollo_server = gql`
  query Query {
    hello
  }
`
export const get_all_movies = gql`
  query Movies {
    Movies {
      id
      title
      releaseDate
      status
    }
  }
`
