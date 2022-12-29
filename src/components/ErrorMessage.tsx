import React from 'react'
import Typography from '@mui/material/Typography'
import { ReactContext } from '../main'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import * as helper from '../helper'

export const ErrorMessage: React.FC<ErrorMessageProps> = Props => {
  const { errorMessage } = Props
  const { errorObj } = Props

  // 这个错误信息表示你在渲染一个组件 (ErrorMessage) 的时候尝试去更新另一个组件 (ContextManager)。这个行为是不允许的，因为在 React 中，每次组件渲染时都要保证组件状态是一致的。
  // const { homePageState, setHomePageState } = React.useContext(ReactContext)
  // setHomePageState!({
  //   isError: true,
    // message: helper.ErrorMessageTransfer(errorMessage)
  // })

  return (
    <Alert severity='error'>
      <AlertTitle>{helper.ErrorMessageTransfer(errorMessage)}</AlertTitle>
      <Typography>{JSON.stringify(errorObj)}</Typography>
    </Alert>
  )
}

// 使用 react 內建的 PropsWithChildren
type ErrorMessageProps = React.PropsWithChildren<{
  errorMessage: string
  errorObj?: any
}>
