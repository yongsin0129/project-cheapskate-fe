import React from 'react'
import { ReactContext } from '../main'

const SecondRoundMovie = () => {
  const { myFollowedMovie } = React.useContext(ReactContext)

  return <div className='pageContent'>SecondRoundMovie</div>
}

export default SecondRoundMovie
