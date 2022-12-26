import React from 'react'
import { MovieDataContext } from '../main'

const FirstRoundMovie = () => {
  const MovieData = React.useContext(MovieDataContext)
  return <div className='pageContent'>FirstRoundMovie</div>
}

export default FirstRoundMovie
