import React from 'react'
import * as helper from '../helper'

export const MeContext = React.createContext({})

// ------------------------------     variable initial   ------------------------------
const token = helper.getToken()?.data || null
const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

export const MeManager: React.FC<React.PropsWithChildren> = () => {
  const [MeToken, setMeToken] = React.useState(jwt_token)
  const [Me, setMe] = React.useState<Me | null>(null)

  return (
    <MeContext.Provider
      value={{ MeToken, setMeToken, Me, setMe }}
    ></MeContext.Provider>
  )
}
