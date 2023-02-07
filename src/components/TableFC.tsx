import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  IntegratedFiltering,
  SearchState
} from '@devexpress/dx-react-grid'

import { Heart_Icon as FavoriteCell } from './TableFC_Heart_Icon'
import { StatusCell } from './TableFC_Status_Cell'
import * as helper from '../helper'

import styles from './styles/table.module.scss'

/********************************************************************************
*
          main Function component
*
*********************************************************************************/
export const TableFC: React.FC<TableFCProps> = props => {
  // debug 專用
  helper.debugTool.traceStack(TableFC)

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
    /* ------------------------ Custom Sorting Algorithm  */
  }
  const [integratedSortingColumnExtensions] = useState([
    { columnName: 'status', compare: compareFavorite },
    { columnName: 'release', compare: compareRelease }
  ])
  {
    /* ------------------------ Sorting Extensions  */
  }
  const [sortingStateColumnExtensions] = useState([
    { columnName: 'favorite', sortingEnabled: false }
  ])

  return (
    <Paper sx={{ width: '100%' }} className={styles.table}>
      {/* ------------------------ Grid 的 Date */}
      <Grid rows={tableData} columns={columns}>
        {/* ------------------------ grid 搜尋器的 state manager */}
        <SearchState defaultValue='' />

        {/* ------------------------ column排序器的 state manager */}
        <SortingState
          defaultSorting={[{ columnName: 'release', direction: 'desc' }]}
          columnExtensions={sortingStateColumnExtensions}
        />
        <IntegratedSorting
          columnExtensions={integratedSortingColumnExtensions}
        />

        {/* ------------------------ column過濾器的 state manager , IntegratedFiltering 也包含 search bar */}
        {/* <FilteringState defaultFilters={[]} /> */}
        <IntegratedFiltering />

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
  { name: 'favorite', title: '\u2764' }
]

/********************************************************************************
*
          children function component
*
*********************************************************************************/

// 藉由 每個 ( column , row ) 在生成的時候，自定義內容
const Cell: React.FC<Table.DataCellProps> = React.memo(props => {
  // debug 專用
  helper.debugTool.traceStack(Cell, 'Cell')

  // 父層取得 column 資料
  const { column } = props

  // 針對 'favorite column 客製化'
  if (column.name === 'favorite') {
    return <FavoriteCell {...props} />
  }

  // 針對 'status column 客製化'
  if (column.name === 'status') {
    return <StatusCell {...props} />
  }

  // 另外兩個 column : title and releaseDate
  return <Table.Cell {...props} />
})

/********************************************************************************
*
          helper for Custom Sorting Algorithm
*
*********************************************************************************/
function compareFavorite (a: string, b: string) {
  const priorityState: priorityState = {
    firstRound: 1,
    leaveFirstRound: 2,
    secondRound: 3,
    leaveSecondRound: 4,
    streaming: 5,
    notReleased: 6
  }

  if (priorityState[a] === priorityState[b]) {
    return 0
  }
  return priorityState[a] > priorityState[b] ? 1 : -1
}

function compareRelease (a: string, b: string) {
  const UnixA = dateTimeFormatter(a)
  const UnixB = dateTimeFormatter(b)
  return UnixA > UnixB ? 1 : -1
}

interface priorityState {
  [index: string]: Number
}

function dateTimeFormatter (dataTime: string) {
  const match = dataTime.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)
  const year = match && match[1]
  const month = match && match[2].padStart(2, '0')
  const day = match && match[3].padStart(2, '0')

  const date = new Date(`${year}-${month}-${day}`)
  return date.getTime()
}
