import * as React from 'react'

export const useTriggerMovieDetails = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const targetMovieURL = React.useRef('')
  const targetMovieID = React.useRef('')
  const targetMovieTitle = React.useRef('')

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
      const movieId = movieURL.split('movie/')[1].split('/')[0]
      const fetchURL = `https://cheapskate-nginx.fly.dev/movie/?target_movieID=${movieId}`
      const movieTitle = tableRowDOM.querySelector('td')?.innerHTML || '暫時找不到電影名稱'
      targetMovieURL.current = fetchURL
      targetMovieID.current = movieId
      targetMovieTitle.current = movieTitle
      setOpenModal(true)
    }
  }

  return {
    triggerRowDetail,
    openModal,
    setOpenModal,
    targetMovieURL,
    targetMovieID,
    targetMovieTitle
  }
}
