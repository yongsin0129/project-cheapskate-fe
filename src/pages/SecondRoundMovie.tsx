import React from 'react'
import { MovieDataContext } from '../main'

const SecondRoundMovie = () => {
  const MovieData = React.useContext(MovieDataContext)
  console.log(MovieData)

  return <div>SecondRoundMovie</div>
}

export default SecondRoundMovie
