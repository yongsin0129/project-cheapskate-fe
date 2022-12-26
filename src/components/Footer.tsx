import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const Footer: React.FC = props => {
  const theme = useTheme()
  return (
    <Typography id='footer' variant='h6' color={theme.palette.text.primary}>
      {'Copyright © '} Cheapskate 2022
    </Typography>
  )
}
