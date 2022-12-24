import React from 'react'
import { MovieDataContext } from '../main'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'

const AllMovies = () => {
  const MovieData = React.useContext(MovieDataContext)

  const { loading, error, data } = useQuery(gql.hello_apollo_server)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>
  console.log(data)
  
  return <div>AllMovies</div>
}

export default AllMovies
