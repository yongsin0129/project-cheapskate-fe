import React from 'react'
import * as helper from '../helper'

interface MeContext {
  MeToken?: { jwt_token: string } | null
  setMeToken?: React.Dispatch<
    React.SetStateAction<{ jwt_token: string } | null>
  >
  Me?: Me | null
  setMe?: React.Dispatch<React.SetStateAction<Me | null>>
}

export const MeContext = React.createContext<MeContext>({})

// ------------------------------     variable initial   ------------------------------
const token = helper.getToken()?.data || null
const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

export const MeManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [MeToken, setMeToken] = React.useState(jwt_token)
  const [Me, setMe] = React.useState<Me | null>(null)

  const MeContextValue = React.useMemo(() => {
    return { MeToken, setMeToken, Me, setMe }
  }, [MeToken, setMeToken, Me, setMe])

  return (
    <MeContext.Provider value={{ ...MeContextValue }}>
      {children}
    </MeContext.Provider>
  )
}
