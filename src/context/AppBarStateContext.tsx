import React from 'react'
import * as helper from '../helper'

interface appBarStateContext {
  appBarState?: PageState
  setAppBarState?: React.Dispatch<React.SetStateAction<PageState | undefined>>
}

export const AppBarStateContext = React.createContext<appBarStateContext>({})

export const AppBarStateManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // debug 專用
  helper.debugTool.traceStack(AppBarStateManager)

  const [appBarState, setAppBarState] = React.useState<PageState>()

  const AppBarStateContextValue = React.useMemo(() => {
    return { appBarState, setAppBarState }
  }, [appBarState, setAppBarState])

  return (
    <AppBarStateContext.Provider value={{ ...AppBarStateContextValue }}>
      {children}
    </AppBarStateContext.Provider>
  )
}
