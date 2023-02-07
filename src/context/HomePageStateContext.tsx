import React from 'react'

import * as helper from '../helper'

type setHomePageState = React.Dispatch<React.SetStateAction<PageState>>

// ------------------------------     create Context   ------------------------------
export const HomePageStateContext = React.createContext<PageState | null>(null)
export const HomePageSetStateContext =
  React.createContext<setHomePageState | null>(null)

// ------------------------------     function component   ------------------------------
export const HomePageStateManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  // debug 專用
  helper.debugTool.traceStack(HomePageStateManager)

  const [homePageState, setHomePageState] = React.useState<PageState>({})

  return (
    <HomePageStateContext.Provider value={homePageState}>
      <HomePageSetStateContext.Provider value={setHomePageState}>
        {children}
      </HomePageSetStateContext.Provider>
    </HomePageStateContext.Provider>
  )
}
