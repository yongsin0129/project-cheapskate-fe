import React from 'react'
import { MovieDataContext } from '../main'

const SecondRoundMovie = () => {
  const MovieData = React.useContext(MovieDataContext)

  return <div className='pageContent'>SecondRoundMovie</div>
}

export default SecondRoundMovie
