import { Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import StorageIcon from '@mui/icons-material/Storage'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'

import * as helper from '../helper'

import styles from './styles/homePage.module.scss'

const HomePage = () => {
  // debug 專用
  helper.debugTool.traceStack(HomePage)

  const Theme = useTheme()

  return (
    <Paper className={`pageContent ${styles.homepage}`} sx={{ paddingBottom: 2 }}>
      {/* ----------------------------------  ------- title ---------------  */}
      <Typography color={Theme.palette.primary.main} variant='h2'>
        cheapskate
      </Typography>
      {/* ----------------------------------  ------- subtitle ---------------  */}
      <Typography color={Theme.palette.secondary.main} variant='h6'>
        小氣鬼的電影追蹤工具
      </Typography>
      {/* ----------------------------------  ------- 網站功能說明 --------------- */}
      <Paper id='websiteDescription' className='' elevation={2} sx={{marginTop:"1rem"}}>
        <Typography variant='h6' color={Theme.palette.info.main}>
          網站功能說明
        </Typography>

        <Typography>
          <ul>
            <li>1.查詢最新首輪電影</li>
            <li>2.查詢最新二輪電影</li>
            <li>3.建立專屬收藏清單</li>
            <li>4.確認清單上映狀態</li>
          </ul>
        </Typography>

        <Typography>備註: 首輪及二輪資料每 12 小時更新</Typography>
      </Paper>
      {/* ----------------------------------  ------- 緣起說明 ---------------  */}
      {/* --- For web */}
      <Paper id='reasonDescription' className='web' elevation={2}>
        <Typography variant='h6' color={Theme.palette.info.main}>
          緣起
        </Typography>
        <Typography variant='body1'>
          小氣鬼因為本身很小氣，電影鮮少在首輪就去觀看，
          <br />
          遇到很想看的電影時，會將片名記在心中
          <br />
          等著進二輪片單或上串流時再來欣賞。
          <br />
          但...人的記性總是不好，常常忘記這些感興趣的電影
          <br />
          等到有閒暇之餘時，落入無片可看的窘境。
          <br />
          於是這支 app 就開始進入開發階段。
        </Typography>
      </Paper>
      {/* --- For phone */}
      <Paper id='reasonDescription' className='phone' elevation={2}>
        <Typography variant='h6' color={Theme.palette.info.main}>
          緣起
        </Typography>
        <Typography variant='body1'>
          小氣鬼因為本身很小氣
          <br />
          電影鮮少在首輪就去觀看
          <br />
          遇到很想看的電影時，會將片名記在心中
          <br />
          等著進二輪片單或上串流時再來欣賞。
          <br />
          但...人的記性總是不好
          <br />
          常常忘記，等到有閒暇之餘時
          <br />
          落入無片可看的窘境。
          <br />
          於是這支 app 就開始進入開發階段。
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className="Grid-item">
          <Paper id='accountDescription' className='' elevation={2}>
            {/* ----------------------------------  ------- 帳號說明 ---------------  */}
            <Typography variant='h6' color={Theme.palette.warning.main}>
              註冊帳號說明
            </Typography>
            <Typography>
              因為小氣鬼是免費仔 <br />
              伺服器及資料庫都用免費的 <br />
              所以暫不開放註冊帳號 <br />
              資料庫預設有 100 組帳號可使用 <br />
              email : user[1-100]@example.com <br />
              password : 123456<br />
              也可聯絡作者(永C)創建專屬帳號
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} className="Grid-item">
          <Paper id='futurePlanDescription' className='' elevation={2}>
            {/* ----------------------------------  ------- 未來計畫 ---------------  */}
            <Stack spacing={2}>
              <Typography variant='h6' color={Theme.palette.warning.main}>
                未來計畫更新的功能
              </Typography>
              <Typography>
                <NotificationAddIcon
                  color='primary'
                  fontSize='small'
                  sx={{ marginRight: '0.5rem' }}
                />
                自動 LineBot 發送通知 <br />
              </Typography>
              <Typography>
                <StorageIcon
                  fontSize='small'
                  color='primary'
                  sx={{ marginRight: '0.5rem' }}
                />{' '}
                擴大資料庫
              </Typography>
              <Typography>
                <SettingsInputAntennaIcon
                  fontSize='small'
                  color='primary'
                  sx={{ marginRight: '0.5rem' }}
                />{' '}
                自動查詢串流來源
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      {/* ----------------------------------  ------- Github ---------------  */}
      <Typography
        id='githubLink'
        variant='h6'
        color={Theme.palette.warning.main}
        sx={{ marginTop: '2rem' }}
      >
        專案連結 Github
      </Typography>
      <Typography>
        <Link href='https://github.com/yongsin0129/project-cheapskate'>
          後端 : yongsin0129/project-cheapskate
        </Link>
        <br />
        <Link href='https://github.com/yongsin0129/project-cheapskate-fe'>
          前端 : yongsin0129/project-cheapskate-fe
        </Link>
      </Typography>
    </Paper>
  )
}

export default HomePage
