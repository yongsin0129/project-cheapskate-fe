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
