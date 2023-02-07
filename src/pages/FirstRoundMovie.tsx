import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useQuery } from '@apollo/client'
import { TableFC } from '../components/TableFC'
import { Loading } from '../components/Loading'
import { ErrorMessage } from '../components/ErrorMessage'
import * as gql from '../gqlQuerys'
import * as helper from '../helper'

const FirstRoundMovie = () => {
  // debug 專用
  helper.debugTool.traceStack(FirstRoundMovie)

  // --------------------------------- Query handle error
  const { loading, error, data }: QueryResType = useQuery(
    gql.get_movies_by_status,
    {
      variables: { status: 'firstRound' }
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
        />
      </Box>
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

export default FirstRoundMovie

interface QueryResType {
  loading?: unknown
  error?: unknown
  data?: { Movies: MovieDataResponsive[] }
}
