import React, { useState } from 'react'
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
import { alpha, styled } from '@mui/material/styles'
import { width } from '@mui/system'

const PREFIX = 'Demo'
const classes = {
  tableStriped: `${PREFIX}-tableStriped`
}
const StyledTable = styled(Table.Table)(({ theme }) => ({
  [`&.${classes.tableStriped}`]: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: alpha(theme.palette.primary.light, 0.5)
    }
  }
}))

const TableComponent: React.FC = props => (
  <StyledTable {...props} className={classes.tableStriped} />
)

export const TableFC = () => {
  const [tableColumnExtensions] = useState([
    { columnName: 'title', align: 'center' },
    { columnName: 'release', align: 'center' },
    { columnName: 'status', align: 'center' }
  ] as tableColumnExtensionsType[])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageSizes] = useState([10, 25, 50])

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SearchState defaultValue='' />
        <SortingState
          defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table
          tableComponent={TableComponent}
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
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
  { name: 'status', title: 'Status' }
]

const rows: object[] = []

for (let index = 0; index < 50; index++) {
  rows.push({
    title: `title${index}`,
    release: `未知${index}`,
    status: `leaveFirstRound${index}`
  })
}
