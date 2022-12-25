import React from 'react'
import { MovieDataContext } from '../main'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import { TableFC } from '../components/TableFC'

const AllMovies = () => {
  const MovieData = React.useContext(MovieDataContext)

  const { loading, error, data }: QueryResType = useQuery(gql.get_all_movies)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  const tableData = data?.Movies?.map(v => {
    return {
      id: v.id,
      title: v.title,
      release: v.releaseDate,
      status: v.status,
      url: v.url
    }
  })

  if (tableData)
    return (
      <div>
        AllMovies
        <TableFC tableData={tableData} />
      </div>
    )
    else return <p>無資料</p>
}

export default AllMovies

interface QueryResType {
  loading?: unknown
  error?: unknown
  data?: { Movies: MovieDataResponsive[] }
}
