import * as React from 'react'
import { useAuth } from 'oidc-react'
import { getToken } from 'utils/authService'

const LoginOIDC = () => {
  const auth = useAuth()
  console.log('loginOIDC' + auth)

  return <div>Redirecting...</div>
}

export default LoginOIDC
