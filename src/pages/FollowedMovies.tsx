import React from 'react'
import { ReactContext } from '../main'

const FollowedMovies = () => {
  const { myFollowedMovie } = React.useContext(ReactContext)
  return <div className='pageContent'>FollowedMovies</div>
}

export default FollowedMovies
