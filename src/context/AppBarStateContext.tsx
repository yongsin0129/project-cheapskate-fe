import React from 'react'

interface appBarStateContext {
  appBarState?: PageState
  setAppBarState?: React.Dispatch<React.SetStateAction<PageState | undefined>>
}

export const AppBarStateContext = React.createContext<appBarStateContext>({})

export const AppBarStateManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [appBarState, setAppBarState] = React.useState<PageState>()

  return (
    <AppBarStateContext.Provider value={{ appBarState, setAppBarState }}>
      {children}
    </AppBarStateContext.Provider>
  )
}
