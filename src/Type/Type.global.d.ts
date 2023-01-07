/// <reference types="vite/client" />
type Maybe<T> = T | null
type InputMaybe<T> = Maybe<T>
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

// 自行定義一個 props 的格式
type FCProps = { foo: {}; children?: any } 

// 使用 react 內建的 PropsWithChildren
type TableFCProps = React.PropsWithChildren<{
  tableData: MovieDataResponsive[]
}> 

interface tableColumnExtensionsType {
  columnName: string
  align: 'left' | 'right' | 'center'
  width: string
}

interface sortingType {
  columnName: string
  direction: 'asc' | 'desc'
}

type MovieDataResponsive = {
  __typename?: 'MovieList'
  createAt?: Maybe<Scalars['DateTime']>
  followedByUsers?: Maybe<Array<Maybe<UserDataResponsive>>>
  id?: Scalars['ID']
  releaseDate?: Scalars['String']
  status?: Scalars['String']
  title?: Scalars['String']
  updateAt?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
}

type UserDataResponsive = {
  __typename?: 'User'
  createAt?: Maybe<Scalars['DateTime']>
  email?: Maybe<Scalars['String']>
  followedMovies?: Maybe<Array<Maybe<MovieDataResponsive>>>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  updateAt?: Maybe<Scalars['DateTime']>
}

interface QueryResType {
  loading?: any
  error?: any
  data?: any
}

interface PageState {
  isLoading?: boolean
  isError?: boolean
  error?: object
  message?: string
}

interface Me {
  id: string
  name: string
  email: string
  followedMovies: Array<Maybe<MovieDataResponsive>>
}
