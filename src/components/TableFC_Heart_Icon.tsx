import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useMutation } from '@apollo/client'
import * as gql from '../gqlQuerys'

// Heart_Icon 藉由 className favoriteActive 來控制愛心有無 active
export const Heart_Icon: React.FC<any> = Props => {
  // ---------------------------------------------  從父層取得 Props
  const defaultActive = Props.active === 'true'

  // ---------------------------------------------  useState
  const [deleteConfirm_open, setDeleteConfirm_open] = React.useState(false)
  const [isActive, setIsActive] = React.useState<boolean>(false)

  // ---------------------------------------------  useEffect
  React.useEffect(() => {
    // 先確認 localStorage 有無 HeartIcon active 的資料
    const isActiveInLocal = window.localStorage.getItem(`${Props.row.id}`)

    if (!!isActiveInLocal) {
      setIsActive(() => JSON.parse(isActiveInLocal))
    } else {
      // 若 localStorage 無值，則用 Props 的值
      setIsActive(defaultActive)
    }
  }, [])

  // ---------------------------------------------  useMutation
  const [Add_Followed_Movies_Function, addFollowResponse] = useMutation(
    gql.AddFollowedMovies,
    { refetchQueries: [{ query: gql.get_all_movies }] }
  )

  const addFollowResponseError = (addFollowResponse as QueryResType).error
  if (addFollowResponseError)
    return <p>{JSON.stringify(addFollowResponseError.message)}`</p>

  const [Remove_Followed_Movies_Function, removeFollowResponse] = useMutation(
    gql.RemoveFollowedMovies,
    {}
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
    // 如果愛心已經是 active 觸發 mutation remove favorite
    if ((e.target as HTMLElement).className.includes('favoriteActive')) {
      handleDeleteConfirmClickOpen()

      // 如果愛心不是 active 觸發 mutation add favorite
    } else if ((e.target as HTMLElement).className.includes('favoriteIcon')) {
      Add_Followed_Movies_Function({ variables: { movieListId: rowData.id } })
      setIsActive(() => true)
      window.localStorage.setItem(`${rowData.id}`, JSON.stringify(true))
    } else {
      alert('恭喜觸發 handleHeartClick 彩蛋，請截圖給製作者')
    }
  }

  const handleHeartClickAndConfirmDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    rowData: any
  ) => {
    handleDeleteConfirmClose()
    setIsActive(() => false)
    window.localStorage.setItem(`${rowData.id}`, JSON.stringify(false))
    Remove_Followed_Movies_Function({ variables: { movieListId: rowData.id } })
  }

  return (
    <div>
      <i
        // 因為rowData.id 的第一個字可能是數字，這樣 querySelector 無法作用，所以前面加上一個 'a'
        id={`a${Props.row.id}`}
        className={isActive ? IconActiveClassName : IconNotActiveClassName}
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
    </div>
  )
}

/********************************************************************************
*
          helper
*
*********************************************************************************/
const IconNotActiveClassName = 'fa-solid fa-heart favoriteIcon'
const IconActiveClassName = 'fa-solid fa-heart favoriteIcon favoriteActive'
