import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { ColorModeContext } from '../context'
import * as helper from '../helper'

import styles from "./styles/toggleModeButton.module.scss";

export const ToggleModeButton = React.memo(() => {
  // debug 專用
  helper.debugTool.traceStack(ToggleModeButton, 'ToggleModeButton')

  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box className={styles.ToggleModeButton} sx={{ color: 'secondary.light' }}>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color='inherit'
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  )
})
