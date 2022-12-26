export const getToken = () => {
  const localStorage_token = localStorage.getItem('jwt_token')
  if (!!localStorage_token) {
    const token = JSON.parse(localStorage_token)
    return token
  }
  return null
}
