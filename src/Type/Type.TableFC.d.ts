import { GridProps, Table } from '@devexpress/dx-react-grid-material-ui'

// 針對 @devexpress 套件做 type 補充，因為版本修改關係造成的 bugs
declare module '@devexpress/dx-react-grid-material-ui' {
  interface GridProps {
    children?: React.ReactElement[]
  }
}

export interface FavoriteCellProps extends Table.DataCellProps {
  active?: string
}
