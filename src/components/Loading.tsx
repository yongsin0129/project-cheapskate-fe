import '../style/dist/loading.css'
import Box from '@mui/material/Box'

export const Loading: React.FC<LoadingFCProps> = ({ sx }) => {
  return (
    <Box className='loading' sx={sx}>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
      <div className='loading__square'></div>
    </Box>
  )
}

type LoadingFCProps = React.PropsWithChildren<{
  sx: React.CSSProperties
}> // 使用 react 內建的 PropsWithChildren
