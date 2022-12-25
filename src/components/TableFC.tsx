import React, { useState } from 'react'
import '../style/dist/tableFC.css'
import Paper from '@mui/material/Paper'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  SearchPanel,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SearchState
} from '@devexpress/dx-react-grid'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Typography } from '@mui/material'

/********************************************************************************
*
          main Function component
*
*********************************************************************************/
export const TableFC: React.FC<TableFCProps> = props => {
  {
    /* ------------------------ 父層引入的 tableDate  */
  }
  const { tableData } = props

  {
    /* ------------------------ grid column state definition */
  }
  const [tableColumnExtensions] = useState([
    { columnName: 'title', align: 'center', width: '40%' },
    { columnName: 'release', align: 'center', width: '32%' },
    { columnName: 'status', align: 'center', width: '20%' },
    { columnName: 'favorite', align: 'center', width: '8%' }
  ] as tableColumnExtensionsType[])

  {
    /* ------------------------ 分頁器的 state definition */
  }
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizes] = useState([10, 25, 50])

  {
    /* ------------------------ 加入收藏 Icon 的 click handler */
  }

  const clickFavoriteIcon = (e: React.MouseEvent) => {
    if (e.target.className.includes('favoriteIcon')) {
      // 找到父層 : table row
      const tableRowDom = e.target.closest('tr')

      // 取得 movie data title , release date
      const title_releaseDate =
        tableRowDom.children[0].innerText + tableRowDom.children[1].innerText // column : title
      console.log('clickHandler ~ title_releaseDate', title_releaseDate)
    }
  }

  return (
    <Paper onClick={clickFavoriteIcon}>
      {/* ------------------------ Grid 的 Date */}
      <Grid rows={tableData} columns={columns}>
        {/* ------------------------ grid 搜尋器的 state manager */}
        <SearchState defaultValue='' />

        {/* ------------------------ column排序器的 state manager */}
        <SortingState
          defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
        />
        <IntegratedSorting />

        {/* ------------------------ column過濾器的 state manager */}
        {/* <FilteringState defaultFilters={[]} /> */}
        {/* <IntegratedFiltering /> */}

        {/* ------------------------分頁器的 state manager */}
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />

        {/* ------------------------主體 Table 的 UI */}
        <Table
          cellComponent={Cell}
          // tableComponent={TableComponent}
          columnExtensions={tableColumnExtensions}
        />
        {/* ------------------------Table Header 的 UI */}
        <TableHeaderRow showSortingControls />

        {/* ------------------------每個 column 的 filter UI */}
        {/* <TableFilterRow /> */}

        {/* ------------------------需要 Toolbar 才能顯示 searchPanel 的 icon UI */}
        <Toolbar />
        <SearchPanel />

        {/* ------------------------分頁器的 UI */}
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  )
}

const columns = [
  { name: 'title', title: 'Title' },
  { name: 'release', title: 'Release Date' },
  { name: 'status', title: 'Status' },
  { name: 'favorite', title: 'Favorite' }
]

/********************************************************************************
*
          children function component
*
*********************************************************************************/
const FavoriteCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    // style={{ }}
    // className='scssClass'
  >
    <Typography>
      <i className='fa-solid fa-heart favoriteIcon'></i>
    </Typography>
  </Table.Cell>
)

const Cell = (props: any) => {
  const { column, row } = props
  if (column.name === 'favorite') {
    // 這邊的 props 可以到 movies 從後端來的全部資料
    console.log(row.id)
    console.log(props)
    return <FavoriteCell {...props} />
  }
  return <Table.Cell {...props} />
}
