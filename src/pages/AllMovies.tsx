import React from 'react'
import { ReactContext } from '../main'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import { TableFC } from '../components/TableFC'

const AllMovies = () => {
  const {myFollowedMovie} = React.useContext(ReactContext)

  const { loading, error, data }: QueryResType = useQuery(gql.get_all_movies)
  if (loading) return <p className='pageContent'>Loading...</p>
  if (error) return <p className='pageContent'>Error </p>

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
      <div className='pageContent'>
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
