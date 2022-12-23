import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'

import { generateRows } from './demo-data/generator.js'

export const Demo = () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ])
  const [rows] = useState(generateRows({ length: 8 }))

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </Paper>
  )
}
