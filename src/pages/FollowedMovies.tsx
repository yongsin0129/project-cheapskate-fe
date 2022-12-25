import React from 'react'
import { MovieDataContext } from '../main'

const FollowedMovies = () => {
  const MovieData = React.useContext(MovieDataContext)
  return <div className='pageContent'>FollowedMovies</div>
}

export default FollowedMovies
