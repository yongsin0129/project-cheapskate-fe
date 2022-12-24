import React from 'react'
import { MovieDataContext } from '../main'

const FirstRoundMovie = () => {
  const MovieData = React.useContext(MovieDataContext)
  return <div>FirstRoundMovie</div>
}

export default FirstRoundMovie
