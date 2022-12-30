import { useQuery } from '@apollo/client'
import { get_Me_NoGql } from '../gqlQuerys'
import { DTOBase } from '../DTO/dto.base'

// ----------------------------- 從瀏覽器的 localStorage 取得 jwt_token
export const getToken = () => {
  const localStorage_token = localStorage.getItem('jwt_token')
  if (!!localStorage_token) {
    const token = JSON.parse(localStorage_token) as string
    return new DTOBase({ success: true, data: token })
  }
  return undefined
}

// ----------------------------- 將 jwt_token 傳入後端做驗證
export const transferTokenToMe = async () => {
  console.log('觸發 async transferTokenToMe')
  const token = getToken()?.data || null
  const jwt_token = token && { jwt_token: getToken()?.data as string }

  return fetch(import.meta.env.VITE_graphql_endPoint, {
    method: 'POST',
    body: JSON.stringify({ query: get_Me_NoGql }),
    headers: {
      'Content-Type': 'application/json',
      ...jwt_token
    }
  })
    .then(async response => {
      const data = await response.json()
      console.log(' ---- async transferTokenToMe get Me data ---')
      console.log(data)
      if (!!data.errors) {
        return new DTOBase({
          success: false,
          error: data.errors,
          message: JSON.stringify(data.errors)
        })
      } else {
        return new DTOBase({
          success: true,
          data: data.data.Me as Me
        })
      }
    })
    .catch(error => {
      console.log(' ----  async transferTokenToMe fetch error ---')
      console.log(JSON.stringify(error))
      return new DTOBase({
        success: false,
        error,
        message: error.message
      })
    })
}

// ----------------------------- 將 任何的 ErrorMessage 做一層過濾
export const ErrorMessageTransfer = (message: string) => {
  if (message?.includes('too many connections')) {
    return '本時段太多使用者，請過段時間再使用'
  } else if (message?.includes('jwt token not found')) {
    return '沒有帳號記錄，請先登入'
  }

  return message
}

interface Me {
  id: string
  name: string
  email: string
}

// ----------------------------- 比對一個 value 有無在 array 之中
export const isValueInArrayObj = (value: any, array: Array<any>) => {
  const IdArray = array.map((v: any) => v.id)
  return IdArray.indexOf(value) >= 0
}
