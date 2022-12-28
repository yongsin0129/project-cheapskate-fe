import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SavingsIcon from '@mui/icons-material/Savings'
import SettingsIcon from '@mui/icons-material/Settings'
import { NavLink } from 'react-router-dom'
import { MeContext } from '../main'
import { ReactContext } from '../main'
import { Loading } from './Loading'
import Chip from '@mui/material/Chip'
import PersonIcon from '@mui/icons-material/Person'
import { AppBar_tab } from "./AppBar_tab";

export function ResponsiveAppBar () {
  // ---------------------- useContext ----------------------
  const [MeToken, setMeToken, Me, setMe] = React.useContext(MeContext)
  const { appBarState } = React.useContext(ReactContext)

  // ---------------------- useState ----------------------
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [value, setValue] = React.useState(0) //控制 navbar 的 button

  // ---------------------- handler ----------------------
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

  const handleLogOut = () => {
    setMeToken(null)
    localStorage.removeItem('jwt_token')
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
                  <NavLink to={page.href}>
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
            <AppBar_tab/>
          </Box>
          {/* ---------------------------------- 右邊 settings 的 Box ---------------------------------- */}

          {/* 右上角的 loading 動畫 */}
          {!!appBarState?.isLoading && <Loading sx={{ scale: '0.2' }} />}

          {/* 右上角的 loading 結束的主要結構 */}
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

              {/* 如果 Me 存在，顯示 configuration */}
              {!!Me && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip icon={<PersonIcon />} label={Me.name} color='primary' />
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
                    {/* configuration 打開後的下拉選單 */}
                    <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
                      <NavLink to='/' onClick={handleLogOut}>
                        <Typography textAlign='center'>{'Logout'}</Typography>
                      </NavLink>
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
  { id: '1', title: '本周新片', href: './news' },
  { id: '2', title: '本期首輪', href: './FirstRoundMovie' },
  { id: '3', title: '本期二輪', href: './SecondRoundMovie' },
  { id: '4', title: '全部電影', href: './AllMovies' },
  { id: '5', title: '收藏清單', href: './FollowedMovies' }
]
