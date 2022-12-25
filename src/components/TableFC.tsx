import React, { useState } from 'react'
import '../style/dist/tableFC.css'
import Paper from '@mui/material/Paper'
import { alpha, styled } from '@mui/material/styles'
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

const StyledTable = styled(Table.Table)(({ theme }) => ({
  [`&.TestClass`]: {
    '& tbody tr:nth-of-type(odd)': {
      // backgroundColor: alpha(theme.palette.primary.main, 0.5)
    },
    '& tbody tr td:nth-child(4)': {
      // backgroundColor: theme.palette.success.main
    }
  }
}))

// const TableComponent: React.FC = props => (
//   // <StyledTable {...props} className={'TestClass scssClass'} />
// )

const HighlightedCell: React.FC = ({ value, style, ...restProps }) => (
  // console.log(value)
  // console.log(style)
  <Table.Cell
    {...restProps}
    style={{
      backgroundColor: value == 'leaveFirstRound' ? 'red' : 'blue',
      ...style
    }}
    className='scssClass'
  >
    <span
      style={{
        color: value < 5000 ? 'white' : undefined
      }}
    >
      {value}
      <i className='fa-solid fa-gamepad'></i>
    </span>
  </Table.Cell>
)

const Cell = props => {
  const { column } = props
  if (column.name === 'status') {
    // 這邊的 props 可以到 movies 從後端來的全部資料
    console.log(props)
    return <HighlightedCell {...props} />
  }
  return <Table.Cell {...props} />
}

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

  const clickHandler = (e: React.MouseEvent) => {
    const value = window.getComputedStyle(e.target, ':after')
    console.log('clickHandler ~ value', value.content)
    console.log(value.zIndex)
    console.log(e.target.parentElement?.children[0].innerText)
    console.log(e.target.parentElement?.children[1].innerText)
  }

  return (
    <Paper onClick={clickHandler}>
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

const rows: object[] = []

for (let index = 0; index < 50; index++) {
  rows.push({
    title: `title${index}`,
    release: `未知${index}`,
    status: `leaveFirstRound${index}`
  })
}
