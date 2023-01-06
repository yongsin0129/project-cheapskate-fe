import React from 'react'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import { TableFC } from '../components/TableFC'
import { Loading } from '../components/Loading'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ErrorMessage } from '../components/ErrorMessage'
import { MeTokenContext } from '../context'

const FollowedMovies = () => {
  console.log(
    '// ------------------------------     reRender test :  FollowedMovies  ------------------------------ '
  )

  // ------------------------------     useContext   ------------------------------
  const MeToken = React.useContext(MeTokenContext)

  // --------------------------------- Query handle error
  const { loading, error, data }: QueryResType = useQuery(
    gql.get_me_followed_movies,
    {
      context: { headers: { ...MeToken } }
    }
  )
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
          // config={{ isHomePageStateError: false }}
        />
      </Box>
    )

  // ---------------------------------- 將回傳的 data 做 mapping 來符合 tableFC format
  const followedMovies = data?.Me?.followedMovies || null
  const tableData = followedMovies?.map(v => {
    return {
      id: v?.id,
      title: v?.title,
      release: v?.releaseDate,
      status: v?.status,
      url: v?.url
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

export default FollowedMovies

interface QueryResType {
  loading?: unknown
  error?: unknown
  data?: { Me: UserDataResponsive }
}
