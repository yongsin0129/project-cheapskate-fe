import React from 'react'

import { ColorSwitchManager } from './ColorModeContext'
export { ColorModeContext } from './ColorModeContext'

import { ApolloClientManager } from './ApolloClientContext'

import { MeManager } from './MeContext'
export { MeContext } from './MeContext'
export { SetMeContext } from './MeContext'
export { MeTokenContext } from './MeContext'
export { SetMeTokenContext } from './MeContext'

export { AppBarStateContext } from './AppBarStateContext'
import { AppBarStateManager } from './AppBarStateContext'

export { HomePageStateContext } from './HomePageStateContext'
export { HomePageSetStateContext } from './HomePageStateContext'
import { HomePageStateManager } from './HomePageStateContext'

const ContextManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ApolloClientManager>
      <MeManager>
        <ColorSwitchManager>
          <HomePageStateManager>
            <AppBarStateManager>{children}</AppBarStateManager>
          </HomePageStateManager>
        </ColorSwitchManager>
      </MeManager>
    </ApolloClientManager>
  )
}

export default ContextManager
