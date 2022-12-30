import React from 'react'
import { Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const HomePage = () => {
  const Theme = useTheme()

  return (
    <Paper className='pageContent homepage' sx={{ paddingBottom: 2 }}>
      <Stack spacing={1}>
        {/* ----------------------------------  ------- title ---------------  */}
        <Typography color={Theme.palette.primary.main} variant='h2'>
          cheapskate
        </Typography>
        {/* ----------------------------------  ------- subtitle ---------------  */}
        <Typography color={Theme.palette.secondary.main} variant='subtitle1'>
          小氣鬼的電影追蹤工具
        </Typography>
        {/* ----------------------------------  ------- 緣起說明 ---------------  */}
        <Typography variant='h6' color={Theme.palette.info.main}>
          緣起
        </Typography>
        <Typography>
          小氣鬼因為本身很小氣，電影鮮少在首輪就去觀看，
          <br />
          遇到很想看的電影時，會將片名記在心中，等著進二輪片單或上串流時再來欣賞。
          <br />
          但...人的記性總是不好，常常忘記這些感興趣的電影，等到有閒暇之餘時，落入無片可看的窘境。
          <br />
          於是這支 app 就開始進入開發階段。
        </Typography>
        {/* ----------------------------------  ------- 帳號說明 ---------------  */}
        <Typography variant='h6' color={Theme.palette.warning.main}>
          註冊帳號說明
        </Typography>
        <Typography>
          因為小氣鬼是免費仔，伺服器及資料庫都用免費的，所以暫不開放註冊帳號
          <br />
          資料庫預設有 100 組帳號 : use[1-100]example.com , 密碼都是 123456
        </Typography>

        {/* ----------------------------------  ------- 未來計畫 ---------------  */}
        <Typography variant='h6' color={Theme.palette.info.dark}>
          未來計畫更新的功能
        </Typography>
        <Typography>
          * 連結 lineBot , 電影有狀態變更的話，將由 Line 發送訊息通知
          <br />
          * 找尋免費又好用的資料庫及伺服器　（歡迎推薦）
        </Typography>

        {/* ----------------------------------  ------- Github ---------------  */}
        <Typography variant='h6' color={Theme.palette.info.dark}>
          專案連結 Github
        </Typography>
        <Typography>
          <Link href='https://github.com/yongsin0129/project-cheapskate'>
            後端 : https://github.com/yongsin0129/project-cheapskate
          </Link>
          <br />
          <Link href='https://github.com/yongsin0129/project-cheapskate-fe'>
            前端 : https://github.com/yongsin0129/project-cheapskate-fe
          </Link>
        </Typography>
      </Stack>
    </Paper>
  )
}

export default HomePage
