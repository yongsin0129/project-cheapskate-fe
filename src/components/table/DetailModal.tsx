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

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '100vh',
  width: '50vw',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface DetailModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  targetMovieURL: React.MutableRefObject<string>
  targetMovieID: React.MutableRefObject<string>
}

export const DetailModal: React.FC<DetailModalProps> = props => {
  const { openModal, setOpenModal, targetMovieURL, targetMovieID } = props

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const queryClient = useQueryClient()

  const { data, isError, isLoading, error } =
    useFetchMovieDetails(targetMovieURL)

  React.useEffect(() => {
    // open bool is true 打 api 是 false 就不動
    if (openModal === false) return

    // 取消前一次的 打 api 動作
    return () => {
      queryClient.cancelQueries('moviesDetails')
    }
    // deps 可以用 open bool
  }, [openModal])

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>

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
          <Box sx={modalStyle}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              {data?.movieTitle || '電影標題'}
            </Typography>

            {!!isLoading && (
              <Box id='modalLoadingBox'>
                <Loading />
              </Box>
            )}

            <Box id='transition-modal-description' sx={{ mt: 2 }}>
              {!!data && (
                <img
                  id='modalMoviePoster'
                  src={data.posterURL}
                  alt='電影海報'
                ></img>
              )}
              {!!data && (
                <span id='modalMovieDescription'>{data.movieDescription}</span>
              )}

              {!!data && (
                <a
                  id='targetMovieURL'
                  href={`http://www.atmovies.com.tw/movie/${targetMovieID?.current}`}
                >
                  <span>更多電影資訊請轉移至開眼電影網查詢</span>
                </a>
              )}

              {!!isError && <span>{error?.message}</span>}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
