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
  >
    <span
      style={{
        color: value < 5000 ? 'white' : undefined
      }}
    >
      {value}
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
  const { tableData } = props
  const [tableColumnExtensions] = useState([
    { columnName: 'title', align: 'center', width: '40%' },
    { columnName: 'release', align: 'center', width: '32%' },
    { columnName: 'status', align: 'center', width: '20%' },
    { columnName: 'favorite', align: 'center', width: '8%' }
  ] as tableColumnExtensionsType[])

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
      <Grid rows={tableData} columns={columns}>
        <SearchState defaultValue='' />
        <SortingState
          defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
        />
        <IntegratedSorting />
        {/* <FilteringState defaultFilters={[]} /> */}
        <IntegratedFiltering />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
        <Table
          cellComponent={Cell}
          // tableComponent={TableComponent}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        {/* <TableFilterRow /> */}
        <Toolbar />
        <SearchPanel />
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
