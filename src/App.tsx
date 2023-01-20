import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container, Alert, Box } from '@mui/material'

import { ResponsiveAppBar } from './components/AppBar'
import { Footer } from './components/Footer'
import { ToggleModeButton } from './components/ToggleModeButton'
import ProtectedRoute from './components/ProtectedRoute'
import { UserValidator } from './components/UserValidator'
import {
  HomePage,
  FirstRoundMovie,
  SecondRoundMovie,
  AllMovies,
  FollowedMovies,
  SignIn,
  SignUp
} from './pages'
import { HomePageStateContext, HomePageSetStateContext } from './context'
import * as helper from './helper'

import styles from './style/app.module.scss'

export function App () {
  // debug 專用
  helper.debugTool.traceStack(App)

  const homePageState = React.useContext(HomePageStateContext)
  const setHomePageState = React.useContext(HomePageSetStateContext)

  return (
    <Router>
      <Container maxWidth='lg'>
        <Box
          id={styles.app}
          sx={{
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
