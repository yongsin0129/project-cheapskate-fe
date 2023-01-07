import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  AppBarStateContext,
  SetMeContext,
  MeTokenContext,
  HomePageSetStateContext
} from '../context'
import * as helper from '../helper'

export const UserValidator = React.memo(() => {
  // debug 專用
  helper.debugTool.traceStack(UserValidator, 'UserValidator')

  // ------------------------------     context   ------------------------------
  const { setAppBarState } = React.useContext(AppBarStateContext)
  const setMe = React.useContext(SetMeContext)
  const MeToken = React.useContext(MeTokenContext)

  const setHomePageState = React.useContext(HomePageSetStateContext)

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
      helper.debugTool.printMessage('MeToken 發生變化，觸發 setMe')
      helper.debugTool.printUnknown(MeToken, 'MeToken')

      // 更新 context_Me
      if (!!MeToken) updateMe()
      // 清空 context_Me
      else {
        setMe!(null)
        setAppBarState!({ isLoading: false })
      }

      async function updateMe () {
        const value = await helper.transferTokenToMe()
        helper.debugTool.printMessage(' asyncFN transferTokenToMe return : ')
        helper.debugTool.printUnknown(value, 'return value')

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
  }, [MeToken])

  return <Outlet />
})
