import React from 'react'

import { ColorSwitchManager } from './ColorModeContext'
import { ApolloClientManager } from './ApolloClientContext'
import { MeManager } from './MeContext'
import { AppBarStateManager } from './AppBarStateContext'
import { HomePageStateManager } from './HomePageStateContext'

export { ColorModeContext } from './ColorModeContext'
export { MeContext } from './MeContext'
export { SetMeContext } from './MeContext'
export { MeTokenContext } from './MeContext'
export { SetMeTokenContext } from './MeContext'
export { AppBarStateContext } from './AppBarStateContext'
export { HomePageStateContext } from './HomePageStateContext'
export { HomePageSetStateContext } from './HomePageStateContext'

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
