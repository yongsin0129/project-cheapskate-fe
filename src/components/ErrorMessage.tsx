import React from 'react'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { HomePageSetStateContext } from '../context'
import * as helper from '../helper'

export const ErrorMessage: React.FC<ErrorMessageProps> = Props => {
  // debug 專用
  helper.debugTool.traceStack(ErrorMessage)

  const { errorMessage, errorObj, config } = Props

  const setHomePageState = React.useContext(HomePageSetStateContext)

  // 藉由傳入的 config 來控制此 errorMessage 有無需要顯示在 Homepage
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
