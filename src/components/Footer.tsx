import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import * as helper from '../helper'

import styles from './styles/footer.module.scss'

export const Footer: React.FC = React.memo(() => {
  // debug 專用
  helper.debugTool.traceStack(Footer, 'Footer')

  const theme = useTheme()

  return (
    <Typography
      id={styles.footer}
      variant='h6'
      color={theme.palette.text.primary}
    >
      {'Copyright © '} Cheapskate 2022
    </Typography>
  )
})
