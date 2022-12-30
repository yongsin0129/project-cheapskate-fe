import React from 'react'
import Typography from '@mui/material/Typography'
import { ReactContext } from '../main'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import * as helper from '../helper'

export const ErrorMessage: React.FC<ErrorMessageProps> = Props => {
  const { errorMessage } = Props
  const { errorObj } = Props
  const { config } = Props

  // 这个错误信息表示你在 '渲染' 一个组件 (ErrorMessage) 的时候尝试去更新另一个组件 (ContextManager)。这个行为是不允许的，因为在 React 中，每次组件渲染时都要保证组件状态是一致的。

  // '渲染' 一个组件 (ErrorMessage) 只能更新自已的，如果需要在 '渲染' 階段就更新 context ，需要用 useEffect
  const { homePageState, setHomePageState } = React.useContext(ReactContext)

  // 当 value 改变时，更新本地状态
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
