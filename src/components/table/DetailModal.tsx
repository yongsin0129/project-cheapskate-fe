import * as React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Loading } from '../Loading'

import { useFetchMovieDetails } from './hooks/useFetchMovieDetails'

import styles from './styles/detailModal.module.scss'

interface DetailModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  targetMovieURL: React.MutableRefObject<string>
  targetMovieID: React.MutableRefObject<string>
  targetMovieTitle: React.MutableRefObject<string>
}

export const DetailModal: React.FC<DetailModalProps> = props => {
  const {
    openModal,
    setOpenModal,
    targetMovieURL,
    targetMovieID,
    targetMovieTitle
  } = props

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  // 暫時先不做 前端 fetch function
  // const queryClient = useQueryClient()

  // const { data, isError, isLoading, error } =
  //   useFetchMovieDetails(targetMovieURL)

  // React.useEffect(() => {
  //   if (openModal === false) return

  //   // 取消前一次的 打 api 動作,queryKey 需要與 hooks useFetchMovieDetails 內的名字相同
  //   return () => {
  //     queryClient.cancelQueries('moviesDetails')
  //   }
  // }, [openModal])

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      className={styles.detailModal}
    >
      <Fade in={openModal}>
        <Box id='modal-box'>
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            {/* {data?.movieTitle || '電影資料取得中...'} */}
            {targetMovieTitle.current}
          </Typography>

          <Box id='transition-modal-description' sx={{ mt: 2 }}>
            {/* {!!isLoading && (
              <Box id='modalLoadingBox'>
                <Loading />
              </Box>
            )} */}
            {/* {!!data && (
              <>
                <img
                  id='modalMoviePoster'
                  src={`https://cheapskate-nginx.fly.dev/proxy?url=${data.posterURL}`}
                  alt='電影海報無法顯示'
                ></img>
                <span id='modalMovieDescription'>{data.movieDescription}</span>
              </>
            )} */}
            {/* {!!isError && <span>{error?.message}</span>} */}

            {/* no fetch function workaround */}
            {(
              <>
                <span id='modalMovieDescription'>因版權顧慮，只放電影海報布局示意圖</span>
                <br/>
                <span id='modalMovieDescription'>需看電影完整資訊請點擊下方連結</span>
                <img
                  id='modalMoviePoster'
                  src='/moviePoster.png'
                  alt='電影海報無法顯示'
                ></img>
                <span id='modalMovieDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis iure in facilis illo molestiae eius quia a itaque. Ullam sunt sint ab molestias modi explicabo est quis deserunt accusantium? Nulla reprehenderit odio obcaecati, cumque magnam eius voluptas, ab quod dignissimos excepturi maxime natus eum ratione unde ea provident veritatis assumenda!</span>
              </>
            )}
            <a
              id='targetMovieURL'
              href={`http://www.atmovies.com.tw/movie/${targetMovieID?.current}`}
            >
              <span>更多電影資訊請轉移至開眼電影網查詢</span>
            </a>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
