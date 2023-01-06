import React from 'react'
import { ColorSwitchManager } from './ColorModeContext'
export { ColorModeContext } from './ColorModeContext'

const ContextManager: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ColorSwitchManager>{children}</ColorSwitchManager>
}

export default ContextManager
