import React from 'react'
export const AppBarStateContext = React.createContext<ReactContext>({})

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
