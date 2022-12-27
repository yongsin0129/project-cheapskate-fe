import React from 'react'
import { MeContext } from '../main'
import * as gql from '../gqlQuerys'
import { useQuery } from '@apollo/client'
import * as helper from '../helper'

export const TransferTokenToMe: React.FC = () => {
  const [MeToken, setMeToken, Me, setMe] = React.useContext(MeContext)

  // 如果 context_Me 裡面已經有值，就不另外做 gql.get_Me 驗證
  if(!!Me) {
    console.log('context_Me exist')
    return <p></p>
  }

  const jwt_token = helper.getToken()
  // 驗證 token , 並更新 context.Me
  if (!!jwt_token) {
    const { loading, error, data }: QueryResType = useQuery(gql.get_Me)
    if (loading)
      return <p></p>
    if (error) {
      console.log(error.graphQLErrors[0].message)
      return <p>{JSON.stringify(error.message)} </p>
    }
    setMe(data.Me)
    console.log(
      '------------- transferTokenToMe 驗證後的 Me--------------------'
    )
    console.log(Me)
    return <p></p>
  }

  return <p></p>
}
