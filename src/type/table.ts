import { GridProps } from '@devexpress/dx-react-grid-material-ui'
import * as Type from './index'

// react 內建的 PropsWithChildren
export type TableProps = React.PropsWithChildren<{
  tableData: (Type.MovieDataResType | null)[]
}>

export interface TableColumnExtensionsType {
  columnName: string
  align: 'left' | 'right' | 'center'
  width: string
}

// 針對 @devexpress 套件做 type 補充，因為版本關係造成的 bugs
// 似乎作者在 v3 版本中 ， 沒有針對 Grid 新增 children 屬性
declare module '@devexpress/dx-react-grid-material-ui' {
  interface GridProps {
    children?: React.ReactElement[]
  }
}
