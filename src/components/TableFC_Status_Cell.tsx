import React from 'react'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface StatusCellProps extends Table.DataCellProps {}

export const StatusCell: React.FC<StatusCellProps> = Props => {
  const Theme = useTheme()
  const { status }: { status: string } = Props.row
  let displayStatus: string

  switch (status) {
    case 'firstRound':
      displayStatus = '首輪'
      break

    case 'leaveFirstRound':
      displayStatus = '首輪下檔'
      break

    case 'secondRound':
      displayStatus = '二輪'
      break

    case 'leaveSecondRound':
      displayStatus = '二輪下檔'
      break

    case 'streaming':
      displayStatus = '串流'
      break

    default: // notReleased
      displayStatus = '未上映'
      break
  }

  return (
    <Table.Cell {...Props}>
      <Typography variant='body1' sx={{ color: Theme.palette.secondary.main }}>
        <span className='raw-value'>{Props.value}</span>
        <span className='display-value'>{displayStatus}</span>
      </Typography>
    </Table.Cell>
  )
}
