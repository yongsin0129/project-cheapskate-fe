import React from 'react'

interface HomePageContext {
  homePageState?: PageState | undefined
  setHomePageState?: React.Dispatch<React.SetStateAction<PageState | undefined>>
}

export const HomePageStateContext = React.createContext<HomePageContext>({})

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
