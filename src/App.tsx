import '././style/dist/app.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ColorModeContext } from './main'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ResponsiveAppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import {
  HomePage,
  News,
  FirstRoundMovie,
  SecondRoundMovie,
  AllMovies,
  FollowedMovies,
  SignIn
} from './pages'

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
    <Router>
      <Box
        id='app'
        sx={{
          height: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <ResponsiveAppBar />
        <ToggleModeButton />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/News' element={<News />} />
          <Route path='/FirstRoundMovie' element={<FirstRoundMovie />} />
          <Route path='/SecondRoundMovie' element={<SecondRoundMovie />} />
          <Route path='/AllMovies' element={<AllMovies />} />
          <Route path='/FollowedMovies' element={<FollowedMovies />} />
          <Route path='/SignIn' element={<SignIn />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  )
}
