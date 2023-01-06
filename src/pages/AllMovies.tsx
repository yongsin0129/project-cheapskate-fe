import React from 'react'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import { TableFC } from '../components/TableFC'
import { Loading } from '../components/Loading'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ErrorMessage } from '../components/ErrorMessage'

const AllMovies = () => {
  // --------------------------------- Query handle error
  const { loading, error, data }: QueryResType = useQuery(gql.get_all_movies)
  if (!!loading)
    return (
      <Box className='pageContent'>
        <Loading />
      </Box>
    )
  if (!!error)
    return (
      <Box className='pageContent'>
        <ErrorMessage
          errorMessage={(error as Error).message}
          errorObj={error}
        />
      </Box>      
      // <Typography className='pageContent'>{JSON.stringify(error)}</Typography>
    )

  // ---------------------------------- 將回傳的 data 做 mapping 來符合 tableFC format
  const tableData = data?.Movies?.map(v => {
    return {
      id: v.id,
      title: v.title,
      release: v.releaseDate,
      status: v.status,
      url: v.url
    }
  })

  if (!!tableData)
    return (
      <Box className='pageContent'>
        <TableFC tableData={tableData} />
      </Box>
    )
  else return <Typography>無資料</Typography>
}

export default AllMovies

interface QueryResType {
  loading?: unknown
  error?: unknown
  data?: { Movies: MovieDataResponsive[] }
}
