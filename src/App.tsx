import '././style/dist/app.css'
import { TableFC } from './components/TableFC'
import React from 'react'
import { ColorModeContext } from './main'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const ToggleModeButton = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box className='ToggleModeButton'>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color='inherit'
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  )
}

export function App () {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Typography variant='h2' gutterBottom>
        project cheapskate
      </Typography>
      <ToggleModeButton />
      <TableFC />
    </Box>
  )
}
