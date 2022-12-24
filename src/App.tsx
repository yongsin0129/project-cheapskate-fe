import '././style/dist/app.css'
import { TableFC } from './components/TableFC'
import React from 'react'
import { ColorModeContext } from './main'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ResponsiveAppBar } from './components/AppBar'

const ToggleModeButton = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box className='ToggleModeButton' sx={{ color: 'secondary.light' }}>
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
        bgcolor: 'background.default'
      }}
    >
      <ResponsiveAppBar />
      <ToggleModeButton />
      <TableFC />
    </Box>
  )
}
