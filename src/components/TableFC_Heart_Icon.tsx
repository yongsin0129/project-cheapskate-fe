import * as React from 'react'
import _ from 'lodash'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { useMutation } from '@apollo/client'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { MeContext, SetMeContext, MeTokenContext } from '../context'
import * as gql from '../gqlQuerys'
import * as helper from '../helper'

interface Heart_IconProps extends Table.DataCellProps {
  active?: string
}

export const Heart_Icon: React.FC<Heart_IconProps> = React.memo(Props => {
  // debug 專用
  helper.debugTool.traceStack(Heart_Icon, 'Heart_Icon')

  // ---------------------------------------------  useContext
  const Me = React.useContext(MeContext)
  const setMe = React.useContext(SetMeContext)
  const MeToken = React.useContext(MeTokenContext)
  
  // ---------------------------------------------  從父層取得 Props ，判斷愛心實心 or 空心
  const rowMovieId = Props?.row?.id
  let defaultActive
  
  const UserFollowedMovieArray = (Me as UserDataResponsive)?.followedMovies
  if (UserFollowedMovieArray && UserFollowedMovieArray.length !== 0) {
    // 此電影有在 user 的收藏中 ， return 實心愛心
    if (helper.isValueInArrayObj(rowMovieId, UserFollowedMovieArray)) {
      defaultActive = true
    } else {
      defaultActive = false
    }
  }

  // ---------------------------------------------  useState
  const [deleteConfirm_open, setDeleteConfirm_open] = React.useState(false)

  // ---------------------------------------------  useMutation for Add
  const [Add_Followed_Movies_Function, addFollowResponse] = useMutation(
    gql.AddFollowedMovies,
    {
      context: { headers: { ...MeToken } }
    }
  )

  const addFollowResponseError = (addFollowResponse as QueryResType).error
  if (addFollowResponseError)
    return <p>{JSON.stringify(addFollowResponseError.message)}</p>

  // ---------------------------------------------  useMutation for Remove
  const [Remove_Followed_Movies_Function, removeFollowResponse] = useMutation(
    gql.RemoveFollowedMovies,
    {
      context: { headers: { ...MeToken } }
    }
  )
  const removeFollowResponseError = (removeFollowResponse as QueryResType).error
  if (addFollowResponseError)
    return <p>{JSON.stringify(removeFollowResponseError.message)}`</p>

  // ----------------------------------------------   handler
  const handleDeleteConfirmClickOpen = () => {
    setDeleteConfirm_open(true)
  }

  const handleDeleteConfirmClose = () => {
    setDeleteConfirm_open(false)
  }

  const handleHeartClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    rowData: any
  ) => {
    // 如果 context_Me 裡面沒有 MeToken 轉換的值，表示未登入狀態
    if (!Me) {
      alert(' 加入收藏是會員專屬功能，請先登入會員 !!')
      return
    }

    // 如果愛心已經是 active 觸發 mutation remove favorite
    if ((e.target as HTMLElement).className.includes('favoriteActive')) {
      handleDeleteConfirmClickOpen()

      // 如果愛心不是 active 觸發 mutation add favorite
    } else if ((e.target as HTMLElement).className.includes('favoriteIcon')) {
      Add_Followed_Movies_Function({ variables: { movieListId: rowData.id } })

      // 將點擊的電影資料新增到 context_Me 並更新, 用來刷新 Heart_Icon active state
      const copy_Me = _.cloneDeep(Me)
      const { id, title, releaseDate } = rowData
      copy_Me.followedMovies.push({ id, title, releaseDate })
      setMe!(() => copy_Me)
    } else {
      alert('恭喜觸發 handleHeartClick 彩蛋，請截圖給製作者')
    }
  }

  const handleHeartClickAndConfirmDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    rowData: any
  ) => {
    handleDeleteConfirmClose()

    // 更新 context_Me 刷新 Heart_Icon
    const copy_Me = _.cloneDeep(Me!)
    const index = copy_Me.followedMovies!.findIndex(v => v!.id === rowData.id)
    copy_Me.followedMovies!.splice(index, 1)
    setMe!(() => copy_Me)

    Remove_Followed_Movies_Function({ variables: { movieListId: rowData.id } })
  }

  return (
    <Table.Cell {...Props}>
      <i
        // 因為rowData.id 的第一個字可能是數字，這樣 querySelector 無法作用，所以前面加上一個 'a'
        id={`a${Props.row.id}`}
        // Heart_Icon 藉由 className favoriteActive 來控制愛心有無 active
        className={defaultActive ? IconActiveClassName : IconNotActiveClassName}
        onClick={e => {
          handleHeartClick(e, Props.row)
        }}
      ></i>

      {/* 刪除的確認 Dialog */}
      <Dialog
        open={deleteConfirm_open}
        onClose={handleDeleteConfirmClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{' 移除追蹤清單 !? '}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            是否要將 " {Props.row.title} " 移除追蹤清單
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Disagree</Button>
          <Button
            onClick={e => {
              handleHeartClickAndConfirmDelete(e, Props.row)
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Table.Cell>
  )
})

/********************************************************************************
*
          helper
*
*********************************************************************************/
const IconNotActiveClassName = 'fa-solid fa-heart favoriteIcon'
const IconActiveClassName = 'fa-solid fa-heart favoriteIcon favoriteActive'
