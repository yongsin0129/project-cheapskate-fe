import '../style/dist/loading.css'
import Box from '@mui/material/Box'

// 自建一個 sx props ，方便外部使用時客制化
export const Loading: React.FC<LoadingFCProps> = ({ sx }) => {
  return (
    <Box
      className='loading'
      sx={sx}
      style={{ height: 'inherit', width: 'inherit' }}
    >
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
  sx?: React.CSSProperties
}>
