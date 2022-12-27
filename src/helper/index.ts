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
  return fetch(import.meta.env.VITE_graphql_endPoint, {
    method: 'POST',
    body: JSON.stringify({ query: get_Me_NoGql }),
    headers: {
      'Content-Type': 'application/json',
      // {getToken()? ('jwt_token':getToken()!) : {}}
      jwt_token: getToken() || ''
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(' ----  fetch get Me data ---')
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
