import Box from '@mui/material/Box'

import * as helper from '../helper'

import styles from './styles/loading.module.scss'

// 自建一個 sx props ，方便外部使用時客制化
export const Loading: React.FC<LoadingFCProps> = ({ sx }) => {
  // debug 專用
  helper.debugTool.traceStack(Loading)

  return (
    <Box className={styles.loading} sx={sx}>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
      <div className={styles.loading__square}></div>
    </Box>
  )
}

type LoadingFCProps = React.PropsWithChildren<{
  sx?: React.CSSProperties
}>
