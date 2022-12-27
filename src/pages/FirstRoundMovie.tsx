import React from 'react'
import { ReactContext } from '../main'
import Box from '@mui/material/Box'

const FirstRoundMovie = () => {
  const { myFollowedMovie } = React.useContext(ReactContext)
  return <Box className='pageContent'>FirstRoundMovie</Box>
}

export default FirstRoundMovie
