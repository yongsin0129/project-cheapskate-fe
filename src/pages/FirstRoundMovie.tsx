import React from 'react'
import { MovieDataContext } from '../main'

const FirstRoundMovie = () => {
  const MovieData = React.useContext(MovieDataContext)
  console.log(MovieData)
  MovieData.firstRound = ['1', '2']
  return <div>FirstRoundMovie</div>
}

export default FirstRoundMovie
