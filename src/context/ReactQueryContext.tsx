import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import * as helper from '../helper'

const queryClient = new QueryClient()

export const ReactQueryManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // debug 專用
  helper.debugTool.traceStack(ReactQueryManager)

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
