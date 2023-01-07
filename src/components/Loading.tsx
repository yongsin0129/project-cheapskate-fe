import '../style/dist/loading.css'
import Box from '@mui/material/Box'
import * as helper from '../helper'

// 自建一個 sx props ，方便外部使用時客制化
export const Loading: React.FC<LoadingFCProps> = ({ sx }) => {
  // debug 專用
  helper.debugTool.traceStack(Loading)

  return (
    <Box className='loading' sx={sx} style={{ height: '3rem', width: '3rem' }}>
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
