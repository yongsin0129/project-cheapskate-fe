import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ColorSwitchManager } from './ColorModeContext'
import { ApolloClientManager } from './ApolloClientContext'
import { ReactQueryManager } from './ReactQueryContext'
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
      <ReactQueryManager>
        <MeManager>
          <ColorSwitchManager>
            <HomePageStateManager>
              <AppBarStateManager>{children}</AppBarStateManager>
            </HomePageStateManager>
          </ColorSwitchManager>
        </MeManager>
        <ReactQueryDevtools />
      </ReactQueryManager>
    </ApolloClientManager>
  )
}

export default ContextManager
