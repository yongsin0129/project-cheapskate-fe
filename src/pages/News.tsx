import React from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const News = () => {
  const theme = useTheme()

  return (
    <Typography className='pageContent' color={theme.palette.text.primary}>
      News
    </Typography>
  )
}

export default News
