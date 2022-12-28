import React from 'react'

// Heart_Icon 藉由 className favoriteActive 來控制愛心有無 active
export const Heart_Icon: React.FC<any> = Props => {
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
      alert('恭喜觸發 handleHeartClick 彩蛋，請截圖給製作者')
    }
  }

  return (
    <i
      className={`fa-solid fa-heart favoriteIcon ${
        active && 'favoriteActive'
      } `}
      onClick={e => {
        handleHeartClick(e, Props.row)
      }}
    ></i>
  )
}
