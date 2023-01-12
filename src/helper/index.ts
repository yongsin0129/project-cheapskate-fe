import { useQuery } from '@apollo/client'
import { get_Me_NoGql } from '../gqlQuerys'
import { DTOBase } from '../DTO/dto.base'

// ------------------------------     helper config   ------------------------------
const debugMode = false

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

// ----------------------------- 比對一個 value 有無在 array 之中
type IdObject = Object & { id?: string }
export const isValueInArrayObj = (
  idValue: string,
  array: Array<IdObject | null>
) => {
  const IdArray = array.map(v => v?.id)
  return IdArray.indexOf(idValue) >= 0
}

// ------------------------------     DebugMode   ------------------------------
export const debugTool = {
  traceStack: (func?: Function, additionalTitle?: string) => {
    if (!debugMode) return

    console.groupCollapsed(
      `${
        func?.name || additionalTitle || 'anonymous Name'
      } to show to identify trace`
    )
    console.log('additional data hidden inside collapsed group')
    console.trace(func?.name) // hidden in collapsed group
    console.groupEnd()
  },
  printFunctionName: (func: Function) => {
    if (!debugMode) return

    console.log(func.name)
  },
  printUnknown: (unknown: any, header?: string) => {
    if (!debugMode) return

    console.log(` ----------------   ${header}     --------------- `)
    console.log(unknown)
    console.log(` ----------------                 --------------- `)
  },
  printMessage: (mes: string) => {
    if (!debugMode) return

    console.log(` --  ${mes}  -- `)
  }
}
