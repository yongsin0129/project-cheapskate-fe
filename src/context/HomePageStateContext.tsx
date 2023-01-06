import React from 'react'
export const HomePageStateContext = React.createContext<ReactContext>({})

export const HomePageStateManager: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [homePageState, setHomePageState] = React.useState<PageState>()

  return (
    <HomePageStateContext.Provider value={{ homePageState, setHomePageState }}>
      {children}
    </HomePageStateContext.Provider>
  )
}
