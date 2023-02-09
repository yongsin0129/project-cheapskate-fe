import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useQuery } from '@apollo/client'
import { TableFC } from '../components/table'
import { Loading } from '../components/Loading'
import { ErrorMessage } from '../components/ErrorMessage'
import { MeTokenContext } from '../context'
import * as gql from '../gqlQuerys'
import * as helper from '../helper'
import * as Type from '../Type'

const FollowedMovies = () => {
  // debug 專用
  helper.debugTool.traceStack(FollowedMovies)

  // ------------------------------     useContext   ------------------------------
  const MeToken = React.useContext(MeTokenContext)

  // --------------------------------- Query handle error
  const { loading, error, data } = useQuery<Type.MeDataQueryType>(
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
  const followedMovies = data?.Me.followedMovies || null
  const tableData = helper.mappingQueryMoviesData(followedMovies)

  if (!!tableData)
    return (
      <Box className='pageContent'>
        <TableFC tableData={tableData} />
      </Box>
    )
  else return <Typography>無資料</Typography>
}

export default FollowedMovies
