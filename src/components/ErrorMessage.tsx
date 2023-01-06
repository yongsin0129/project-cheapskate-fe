import React from 'react'
import Typography from '@mui/material/Typography'
import { HomePageSetStateContext } from '../context'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import * as helper from '../helper'

export const ErrorMessage: React.FC<ErrorMessageProps> = Props => {
  console.log(
    '// ------------------------------   reRender test : ErrorMessage     ------------------------------ '
  )

  const { errorMessage } = Props
  const { errorObj } = Props
  const { config } = Props

  const setHomePageState = React.useContext(HomePageSetStateContext)

  React.useEffect(() => {
    setHomePageState!({
      isError: config?.isHomePageStateError,
      message: helper.ErrorMessageTransfer(errorMessage)
    })
  }, [])

  return (
    <Alert severity='error' sx={{ width: '100%' }}>
      <AlertTitle>{helper.ErrorMessageTransfer(errorMessage)}</AlertTitle>
      <Typography>{JSON.stringify(errorObj)}</Typography>
    </Alert>
  )
}

// 使用 react 內建的 PropsWithChildren
type ErrorMessageProps = React.PropsWithChildren<{
  errorMessage: string
  errorObj?: any
  config?: ConfigOption
}>

interface ConfigOption {
  isHomePageStateError: boolean
}
