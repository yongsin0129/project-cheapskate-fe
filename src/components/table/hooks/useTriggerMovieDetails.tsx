import * as React from 'react'

export const useTriggerMovieDetails = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const targetMovieURL = React.useRef('')

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
      const movieId = movieURL.split('movie/')[1].split('/')[0];
      const fetchURL = `http://cheapskate-nginx.fly.dev/?target_movieID=${movieId}`
      targetMovieURL.current = fetchURL
      setOpenModal(true)
    }
  }

  return {
    triggerRowDetail,
    openModal,
    setOpenModal,
    targetMovieURL
  }
}
