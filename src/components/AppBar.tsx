import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SavingsIcon from '@mui/icons-material/Savings'
import SettingsIcon from '@mui/icons-material/Settings'
import Link from '@mui/material/Link'
import { NavLink } from 'react-router-dom'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import { MeContext } from '../main'
import { ReactContext } from '../main'
import { Loading } from './Loading'

export function ResponsiveAppBar () {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [MeToken, setMeToken, Me, setMe] = React.useContext(MeContext)
  const { appBarState } = React.useContext(ReactContext)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SavingsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <NavLink to='/'>Cheapskate</NavLink>
          </Typography>

          {/* ---------------------------------- 小螢幕使用的 Box ---------------------------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map(page => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <NavLink to={page.herf}>
                    <Typography textAlign='center'>{page.title}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SavingsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Cheapskate
          </Typography>

          {/* ---------------------------------- 正常螢幕使用的 Box ---------------------------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to={page.herf}>
                  <Typography textAlign='center'>{page.title}</Typography>
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* ---------------------------------- 右邊 settings 的 Box ---------------------------------- */}

          {!!appBarState?.isLoading && <Loading sx={{ scale: '0.2' }} />}

          {!appBarState?.isLoading && (
            <Box sx={{ flexGrow: 0 }}>
              {/* 如果 Me 不存在，顯示登入按鈕 */}
              {!Me && (
                <Tooltip title='請點擊連入登入頁面'>
                  <NavLink to={'signIn'}>
                    <Button color='info' variant='contained'>
                      Sign In
                    </Button>
                  </NavLink>
                </Tooltip>
              )}
              {/* 如果 Me 存在，顯示歡迎並提供 config */}
              {!!Me && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ marginRight: 2 }}>{Me.name}</Typography>
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <SettingsIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
                      <Button>
                        <Typography textAlign='center'>{'Logout'}</Typography>
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const pages = [
  { id: '1', title: '本周新片', herf: './news' },
  { id: '2', title: '本期首輪', herf: './FirstRoundMovie' },
  { id: '3', title: '本期二輪', herf: './SecondRoundMovie' },
  { id: '4', title: '全部電影', herf: './AllMovies' },
  { id: '5', title: '收藏清單', herf: './FollowedMovies' }
]
const settings = ['Profile', 'Logout']
