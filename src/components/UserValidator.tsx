import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBarStateContext, MeContext, HomePageStateContext } from '../context'
import * as helper from '../helper'

export const UserValidator = () => {
  console.log(
    '// ------------------------------   UserValidator     ------------------------------ '
  )
  // ------------------------------     context   ------------------------------
  const { setAppBarState } = React.useContext(AppBarStateContext)
  const { MeToken, setMe } = React.useContext(MeContext)
  const { setHomePageState } = React.useContext(HomePageStateContext)

  // ------------------------------     useRef   ------------------------------
  const MeTokenRef = React.useRef<{ jwt_token: string } | null>(null)

  // context_MeToken 有變化後觸發， 更新 Me
  React.useEffect(() => {
    // 如果 context_MeToken 沒有變化，直接 return
    if (MeTokenRef.current === MeToken) return
    // 如果 context_MeToken 有變化，開始同步 context_Me
    else {
      // 將最近的 MeToken 存入 Ref 中
      MeTokenRef.current = MeToken || null

      // 將 AppBar 的 loading 狀態為 true
      setAppBarState!({ isLoading: true })
      console.log('MeToken 發生變化，觸發 useEffect 更新 setClient , setMe')
      console.log(MeToken)

      // 更新 context_Me
      if (!!MeToken) updateMe()
      // 清空 context_Me
      else {
        setMe!(null)
        setAppBarState!({ isLoading: false })
      }

      async function updateMe () {
        const value = await helper.transferTokenToMe()
        console.log(' useEffect 裡面的 asyncFN value : ')
        console.log(value)

        // 如果轉換成功，將 context_Me 更新
        if (!!value.success) setMe!(value.data as Me)

        // 如果轉換失敗，將 message 顯示在 HomePage 上
        if (!value.success) {
          setHomePageState!({
            isError: true,
            message: helper.ErrorMessageTransfer(
              value.message || JSON.stringify(value.error)
            )
          })
        }

        // 將 AppBar 的 loading 狀態取消
        setAppBarState!({ isLoading: false })
      }
    }
  })
  return <Outlet />
}