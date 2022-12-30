import { gql } from '@apollo/client'

export const hello_apollo_server = gql`
  query Query {
    hello
  }
`
export const get_all_movies = gql`
  query Movies {
    Movies {
      id
      title
      releaseDate
      status
      url
    }
  }
`

export const get_Me = gql`
  query Me {
    Me {
      id
      name
      email
      followedMovies {
        id
        title
        releaseDate
      }
    }
  }
`
export const get_Me_NoGql = `
  query Me {
    Me {
      id
      name
      email
      followedMovies {
        id
        title
        releaseDate
      }
    }
  }
`

export const AddFollowedMovies = gql`
  mutation AddFollowedMovies($movieListId: String) {
    addFollowedMovies(MovieListId: $movieListId) {
      id
      name
      email
      followedMovies {
        id
        title
        releaseDate
        status
      }
    }
  }
`

export const RemoveFollowedMovies = gql`
  mutation RemoveFollowedMovies($movieListId: String) {
    removeFollowedMovies(MovieListId: $movieListId) {
      id
      name
      email
      followedMovies {
        id
        title
        releaseDate
        status
      }
    }
  }
`
export const get_me_followed_movies = gql`
  query Me {
    Me {
      id
      name
      email
      followedMovies {
        id
        title
        releaseDate
        status
        url
      }
    }
  }
`

export const get_movies_by_status = gql`
  query Movies($status: Status) {
    Movies(status: $status) {
      id
      title
      releaseDate
      status
      url
    }
  }
`
