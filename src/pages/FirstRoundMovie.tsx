import React from 'react'
import { ReactContext } from '../main'

const FirstRoundMovie = () => {
  const { myFollowedMovie } = React.useContext(ReactContext)
  return <div className='pageContent'>FirstRoundMovie</div>
}

export default FirstRoundMovie
