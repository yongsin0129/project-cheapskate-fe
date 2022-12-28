import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { NavLink, useLocation } from 'react-router-dom'

export function AppBar_tab () {
  // 取得當前路徑
  const { pathname } = useLocation()

  const [value, setValue] = React.useState('one')

  React.useEffect(() => {
    // 比對當前路徑，得到目前應該位在那一個 tag
    const currentTagValue = pages.find(v => v.href === pathname)?.id
    setValue(currentTagValue || 'one')
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='inherit'
        indicatorColor='primary'
        aria-label='secondary tabs example'
      >
        {pages.map(page => (
          <Tab
            key={page.id}
            value={page.id}
            label={page.title}
            component={NavLink}
            to={page.href}
          ></Tab>
        ))}
      </Tabs>
    </Box>
  )
}

const pages = [
  { id: 'one', title: '關於本站', href: '/' },
  { id: 'two', title: '本期首輪', href: '/FirstRoundMovie' },
  { id: 'three', title: '本期二輪', href: '/SecondRoundMovie' },
  { id: 'four', title: '全部電影', href: '/AllMovies' },
  { id: 'five', title: '收藏清單', href: '/FollowedMovies' }
]
