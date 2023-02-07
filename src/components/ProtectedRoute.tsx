import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { MeTokenContext } from '../context'
import { HomePageSetStateContext } from '../context'
import * as helper from '../helper'

const ProtectedRoute = () => {
  // debug 專用
  helper.debugTool.traceStack(ProtectedRoute)

  const setHomePageState = React.useContext(HomePageSetStateContext)

  const MeToken = React.useContext(MeTokenContext)

  // 如果 context_Me 有值，表示有登入可繼續 next() , 否則跳轉到登入頁面
  if (!!MeToken) return <Outlet />
  else {
    React.useEffect(() => {
      setHomePageState!({
        isError: true,
        message: '收藏清單是會員專屬功能，請先登入會員 !!'
      })
    }, [])
    return <Navigate to='/signIn' />
  }
}

export default ProtectedRoute
