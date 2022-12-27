import { useQuery } from '@apollo/client'
import { get_Me_NoGql } from '../gqlQuerys'

export const getToken = () => {
  const localStorage_token = localStorage.getItem('jwt_token')
  if (!!localStorage_token) {
    const token = JSON.parse(localStorage_token) as string
    return token
  }
  return undefined
}

export const transferTokenToMe = async () => {
  console.log('觸發 async transferTokenToMe')
  return fetch(import.meta.env.VITE_graphql_endPoint, {
    method: 'POST',
    body: JSON.stringify({ query: get_Me_NoGql }),
    headers: {
      'Content-Type': 'application/json',
      // {getToken()? ('jwt_token':getToken()!) : {}}
      jwt_token: getToken() || ''
    }
  })
    .then(async response => {
      const data = await response.json()
      console.log(' ---- async transferTokenToMe get Me data ---')
      console.log(data)
      return data.data.Me as Me
    })
    .catch(error => {
      console.log(' ----  helper.getMe fetch error ---')
      console.log(JSON.stringify(error))
      return null
    })
}

interface Me {
  id: string
  name: string
  email: string
}
