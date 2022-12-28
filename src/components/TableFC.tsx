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
import { Typography, Popper } from '@mui/material'
import { FavoriteCellProps } from '../Type/Type.TableFC'
import { MeContext } from '../main'
import { isValueInArrayObj } from '../helper'

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

  // const clickFavoriteIcon = (e: React.MouseEvent) => {
  //   if ((e.target as HTMLElement).className.includes('favoriteIcon')) {
  //     // 找到父層 : table row
  //     const tableRowDom = (e.target as HTMLTableElement).closest('tr')

  //     // 取得 movie data title , release date
  //     const title_releaseDate =
  //       (tableRowDom?.children[0]?.innerHTML || '') +
  //       (tableRowDom?.children[1].innerHTML || '')
  //     console.log('clickHandler ~ title_releaseDate', title_releaseDate)
  //   }
  // }
  // <Paper onClick={clickFavoriteIcon} sx={{ width: '100%' }}>

  return (
    <Paper sx={{ width: '100%' }}>
      {/* ------------------------ Grid 的 Date */}
      <Grid rows={tableData} columns={columns}>
        {/* ------------------------ grid 搜尋器的 state manager */}
        <SearchState defaultValue='' />

        {/* ------------------------ column排序器的 state manager */}
        <SortingState
          defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
        />
        <IntegratedSorting />

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
  { name: 'favorite', title: 'Favorite' }
]

/********************************************************************************
*
          children function component
*
*********************************************************************************/
// 藉由 className favoriteActive 來控制愛心有無 active
const FavoriteCell: React.FC<FavoriteCellProps> = Props => {
  const { active } = Props

  const handleHeartClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    rowData: any
  ) => {
    if ((e.target as HTMLElement).className.includes('favoriteActive')) {
      console.log(
        'favoriteActive id : ' + rowData.id + ' title : ' + rowData.title
      )
    } else if ((e.target as HTMLElement).className.includes('favoriteIcon')) {
      console.log(
        'favoriteIcon id : ' + rowData.id + ' title : ' + rowData.title
      )
    } else {
      alert('不知道點擊到那邊去了!')
    }
  }

  return (
    <Table.Cell {...Props}>
      <Typography>
        <i
          className={`fa-solid fa-heart favoriteIcon ${
            active && 'favoriteActive'
          } `}
          onClick={e => {
            handleHeartClick(e, Props.row)
          }}
        ></i>
      </Typography>
    </Table.Cell>
  )
}

// 藉由 每個 ( column , row ) 在生成的時候，自定義內容
const Cell: React.FC<Table.DataCellProps> = props => {
  const [MeToken, setMeToken, Me, setMe] = React.useContext(MeContext)
  const { column, row } = props

  // 針對 'favorite column 客製化'
  if (column.name === 'favorite') {
    const UserFollowedMovieArray = (Me as UserDataResponsive)?.followedMovies
    const rowMovieId = props?.row?.id

    // 如果 context_Me 的 FollowedMovie 有值，開始比對當前的電影有無在 array 之中
    if (UserFollowedMovieArray && UserFollowedMovieArray.length !== 0) {
      if (isValueInArrayObj(rowMovieId, UserFollowedMovieArray))
        return <FavoriteCell active={'true'} {...props} />
    }

    // 如果 不是 active , 則生成 空心的愛心
    return <FavoriteCell {...props} />
  }
  return <Table.Cell {...props} />
}
