import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import * as helper from '../helper'

interface StatusCellProps extends Table.DataCellProps {}

export const StatusCell: React.FC<StatusCellProps> = React.memo(Props => {
  // debug 專用
  helper.debugTool.traceStack(StatusCell)

  const Theme = useTheme()

  // 從父層取得此電影的上映狀態
  const { status }: { status: string } = Props.row
  let displayStatus: string
  let background: object

  switch (status) {
    case 'firstRound':
      displayStatus = '首輪'
      background = {
        backgroundColor: Theme.palette.primary.dark,
        color: Theme.palette.primary.contrastText
      }
      break

    case 'leaveFirstRound':
      displayStatus = '首輪下檔'
      background = {
        backgroundColor: Theme.palette.primary.light,
        color: Theme.palette.primary.contrastText
      }
      break

    case 'secondRound':
      displayStatus = '二輪'
      background = {
        backgroundColor: Theme.palette.secondary.dark,
        color: Theme.palette.secondary.contrastText
      }
      break

    case 'leaveSecondRound':
      displayStatus = '二輪下檔'
      background = {
        backgroundColor: Theme.palette.grey[600]
      }
      break

    case 'streaming':
      displayStatus = '串流'
      background = {
        backgroundColor: Theme.palette.success.main,
        color: Theme.palette.success.contrastText
      }
      break

    default: // notReleased
      displayStatus = '未上映'
      background = {
        backgroundColor: Theme.palette.background.default,
        color: Theme.palette.primary.contrastText
      }
      break
  }

  return (
    <Table.Cell {...Props}>
      <Typography variant='body1' sx={background}>
        <span className='raw-value'>{Props.value}</span>
        <strong>
          <span className='display-value'>{displayStatus}</span>
        </strong>
      </Typography>
    </Table.Cell>
  )
})
