import React from 'react'

import * as helper from '../helper'
import * as Type from '../type'

interface appBarStateContext {
  appBarState?: Type.PageState
  setAppBarState?: React.Dispatch<React.SetStateAction<Type.PageState | undefined>>
}

export const AppBarStateContext = React.createContext<appBarStateContext>({})

export const AppBarStateManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // debug 專用
  helper.debugTool.traceStack(AppBarStateManager)

  const [appBarState, setAppBarState] = React.useState<Type.PageState>()

  const AppBarStateContextValue = React.useMemo(() => {
    return { appBarState, setAppBarState }
  }, [appBarState, setAppBarState])

  return (
    <AppBarStateContext.Provider value={{ ...AppBarStateContextValue }}>
      {children}
    </AppBarStateContext.Provider>
  )
}
