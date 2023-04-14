import * as React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Loading } from '../Loading'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface DetailModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  targetMovieURL: string
  setTargetMovieURL: React.Dispatch<React.SetStateAction<string>>
}

export const DetailModal: React.FC<DetailModalProps> = props => {
  const { openModal, setOpenModal, targetMovieURL, setTargetMovieURL } = props
  console.log('targetMovieURL:', targetMovieURL)

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const queryClient = useQueryClient()

  const { data, isError, isLoading, error } = useQuery<string, Error>(
    ['moviesDetails', targetMovieURL],
    async ({ queryKey }: any) => {
      const response = await fetch(queryKey[1])
      return response.json()
    }
  )
  if (targetMovieURL === '') queryClient.cancelQueries('moviesDetails')

  React.useEffect(() => {
    // open bool is true 打 api 是 false 就不動
    if (openModal === false) return

    // 取消前一次的 打 api 動作
    return () => {
      setTargetMovieURL('')
      queryClient.cancelQueries('moviesDetails')
    }
    // deps 可以用 open bool
  }, [openModal])

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              title
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              {targetMovieURL}
              {!!isError && <div>{error.message}</div>}
              {!!isLoading && <Loading />}
              {!!data && <div>{data}</div>}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
