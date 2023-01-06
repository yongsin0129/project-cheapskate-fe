import '././style/dist/app.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ColorModeContext } from './context'
import { Container, Alert, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ResponsiveAppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import {
  HomePage,
  FirstRoundMovie,
  SecondRoundMovie,
  AllMovies,
  FollowedMovies,
  SignIn,
  SignUp
} from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import { UserValidator } from './components/UserValidator'
import { HomePageStateContext, HomePageSetStateContext } from './context'

// -------------------------------- 明暗 mode 切換的 component
const ToggleModeButton = React.memo(() => {
  console.log(
    '// ------------------------------     reRender test :  ToggleModeButton  ------------------------------ '
  )

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
})

export function App () {
  console.log(
    '// ------------------------------     reRender test :  App  ------------------------------ '
  )

  const homePageState = React.useContext(HomePageStateContext)
  const setHomePageState = React.useContext(HomePageSetStateContext)

  return (
    <Router>
      <Container maxWidth='lg'>
        <Box
          id='app'
          sx={{
            height: '100vh',
            bgcolor: 'background.default'
          }}
        >
          {/*  -----------------------------   使用者驗證 (localstorage -> context_MeToken -> context_Me)   ------------------- */}
          <UserValidator />

          {/*  -----------------------------   網站 nav bar   ------------------- */}
          <ResponsiveAppBar />

          {/*  -----------------------------   網站 homepage alert 提示  ------------------- */}
          {homePageState?.isError && (
            <Alert
              severity='error'
              sx={{ width: '100%', marginTop: '1rem' }}
              onClose={() => setHomePageState!({ isError: false })}
            >
              {homePageState?.message}
            </Alert>
          )}

          {/*  -----------------------------   網站 明暗模式切換  ------------------- */}
          <ToggleModeButton />

          {/*  -----------------------------   網站 路由管理  ------------------- */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/FirstRoundMovie' element={<FirstRoundMovie />} />
            <Route path='/SecondRoundMovie' element={<SecondRoundMovie />} />
            <Route path='/AllMovies' element={<AllMovies />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/FollowedMovies' element={<FollowedMovies />} />
            </Route>

            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
          </Routes>
          <Footer />
        </Box>
      </Container>
    </Router>
  )
}
