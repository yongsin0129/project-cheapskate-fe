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

export const TableFC: React.FC<TableFCProps> = props => {
  const { tableData } = props
  const [tableColumnExtensions] = useState([
    { columnName: 'title', align: 'center' },
    { columnName: 'release', align: 'center' },
    { columnName: 'status', align: 'center' },
    { columnName: 'favorite', align: 'center' }
  ] as tableColumnExtensionsType[])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizes] = useState([10, 25, 50])

  const clickHandler = (e: React.MouseEvent) => {
    const value = window.getComputedStyle(e.target, ':after')
    console.log('clickHandler ~ value', value.content)
    console.log(hasUnicode2(value.content))
    console.log(value.zIndex)
    console.log(e.target.parentElement?.children[0].innerText)
    console.log(e.target.parentElement?.children[1].innerText)
  }

  function hasUnicode (str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return true
    }
    return false
  }

  function hasUnicode2 (s) {
    return /[^\u0004-\u007f]/.test(s)
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
