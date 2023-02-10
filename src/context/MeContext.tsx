import React from 'react'

import * as helper from '../helper'
import * as Type from '../Type'

// ------------------------------     type definition   ------------------------------
type SetMe = React.Dispatch<React.SetStateAction<Type.Me | null>> | null
type MeToken = { jwt_token: string } | null
type SetMeToken = React.Dispatch<
  React.SetStateAction<{ jwt_token: string } | null>
> | null

// ------------------------------     create context   ------------------------------
export const MeContext = React.createContext<Type.Me | null>(null)
export const SetMeContext = React.createContext<SetMe>(null)
export const MeTokenContext = React.createContext<MeToken>(null)
export const SetMeTokenContext = React.createContext<SetMeToken>(null)

// ------------------------------     variable initial   ------------------------------
const token = helper.getToken()?.data || null
const jwt_token = token && { jwt_token: helper.getToken()?.data as string }

// ------------------------------     function component   ------------------------------
export const MeManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  // debug 專用
  helper.debugTool.traceStack(MeManager)

  // ------------------------------     useState   ------------------------------
  const [MeToken, setMeToken] = React.useState(jwt_token)
  const [Me, setMe] = React.useState<Type.Me | null>(null)

  return (
    <MeContext.Provider value={Me}>
      <SetMeContext.Provider value={setMe}>
        <MeTokenContext.Provider value={MeToken}>
          <SetMeTokenContext.Provider value={setMeToken}>
            {children}
          </SetMeTokenContext.Provider>
        </MeTokenContext.Provider>
      </SetMeContext.Provider>
    </MeContext.Provider>
  )
}
