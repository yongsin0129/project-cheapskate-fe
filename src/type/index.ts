import * as table from './table'

export { table }

type Maybe<T> = T | null

type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type MovieDataResType = {
  __typename?: 'MovieList'
  id?: Scalars['ID']
  title?: Scalars['String']
  releaseDate?: Scalars['String']
  status?: Scalars['String']
  url?: Maybe<Scalars['String']>
  createAt?: Maybe<Scalars['DateTime']>
  updateAt?: Maybe<Scalars['DateTime']>
  followedByUsers?: Maybe<Array<Maybe<UserDataResType>>>
}

export type MovieDataQueryType = {
  Movies: MovieDataResType[]
}

export type UserDataResType = {
  __typename?: 'User'
  id?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  createAt?: Maybe<Scalars['DateTime']>
  updateAt?: Maybe<Scalars['DateTime']>
  followedMovies?: Maybe<Array<Maybe<MovieDataResType>>>
}

export type MeDataQueryType = {
  Me: UserDataResType
}

export interface PageState {
  isLoading?: boolean
  isError?: boolean
  error?: object
  message?: string
}

export interface Me {
  id: string
  name: string
  email: string
  followedMovies: Array<Maybe<MovieDataResType>>
}
