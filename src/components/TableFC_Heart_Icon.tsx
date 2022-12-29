import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// Heart_Icon 藉由 className favoriteActive 來控制愛心有無 active
export const Heart_Icon: React.FC<any> = Props => {
  const { active } = Props

  const [deleteConfirm_open, setDeleteConfirm_open] = React.useState(false)

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
    if ((e.target as HTMLElement).className.includes('favoriteActive')) {

      // 此段要寫 mutation remove favorite

      console.log(
        'favoriteActive id : ' + rowData.id + ' title : ' + rowData.title
      )
      handleDeleteConfirmClickOpen()
    } else if ((e.target as HTMLElement).className.includes('favoriteIcon')) {

      // 此段要寫 mutation add favorite
      
      console.log(
        'favoriteIcon id : ' + rowData.id + ' title : ' + rowData.title
      )
    } else {
      alert('恭喜觸發 handleHeartClick 彩蛋，請截圖給製作者')
    }
  }

  return (
    <div>
      <i
        className={`fa-solid fa-heart favoriteIcon ${
          active && 'favoriteActive'
        } `}
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
        <DialogTitle id='alert-dialog-title'>
          {" 移除追蹤清單 !? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
              是否要將 " {Props.row.title} " 移除追蹤清單 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Disagree</Button>
          <Button
            onClick={e => {
              handleDeleteConfirmClose()
              alert('成功移除!')
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
