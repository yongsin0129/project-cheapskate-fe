import * as React from 'react'

export const useTriggerMovieDetails = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [targetMovieURL, setTargetMovieURL] = React.useState('')

  function triggerRowDetail (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as HTMLDivElement
    // 使用者點擊愛心加入收藏，不需要打開 modal
    if (target.classList.contains('favoriteIcon')) return

    let tableRowDOM = null
    // 不斷的向上查找至到 <tr> 為止
    while (
      tableRowDOM === null &&
      target !== document.body &&
      target !== null
    ) {
      const parentNode = (target?.parentNode as HTMLDivElement) || null
      if (parentNode?.tagName === 'TR') tableRowDOM = parentNode
      else target = parentNode
    }

    if (tableRowDOM) {
      const movieURL = tableRowDOM.querySelector('#movieURL')?.innerHTML || ''
      setTargetMovieURL(movieURL)
      setOpenModal(true)
    }
  }

  return {
    triggerRowDetail,
    openModal,
    setOpenModal,
    targetMovieURL,
    setTargetMovieURL
  }
}
