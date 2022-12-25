import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const SignUp = () => {
  const theme = useTheme()
  return (
    <Typography className='pageContent' color={theme.palette.text.primary}>
      Sign Up
    </Typography>
  )
}

export default SignUp
