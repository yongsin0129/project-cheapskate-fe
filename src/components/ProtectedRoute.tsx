import React from 'react'
import { MeContext } from '../context'
import { HomePageSetStateContext } from '../context'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  console.log(
    '// ------------------------------   reRender test : ProtectedRoute     ------------------------------ '
  )

  const setHomePageState = React.useContext(HomePageSetStateContext)

  const { MeToken, setMeToken, Me, setMe } = React.useContext(MeContext)

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
