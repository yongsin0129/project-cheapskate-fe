/// <reference types="vite/client" />
type FCProps = { foo: {}; children?: any } // 自行定義一個 props 的格式
type TableFCProps = React.PropsWithChildren<{ tableData: MovieDataResponsive[] }> // 使用 react 內建的 PropsWithChildren

interface tableColumnExtensionsType {
  columnName: string
  align: 'left' | 'right' | 'center'
}

type tableColumnExtensionsTypeArray = {
  columnName: string
  align: 'left' | 'right' | 'center'
}[]

interface sortingType {
  columnName: string
  direction: 'asc' | 'desc'
}

interface MovieData {
  firstRound: any
  leaveFirstRound: any
  secondRound: any
  leaveSecondRound: any
  notReleased: any
  streaming: any
  MyFollowedMovie:any
}

type MovieDataResponsive = {
  __typename?: 'MovieList'
  createAt?: Maybe<Scalars['DateTime']>
  followedByUsers?: Maybe<Array<Maybe<User>>>
  id?: Scalars['ID']
  releaseDate?: Scalars['String']
  status?: Scalars['String']
  title?: Scalars['String']
  updateAt?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
}
