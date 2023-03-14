import * as React from 'react'
import { useAuth } from 'oidc-react'

const Login = () => {
  const auth = useAuth()

  React.useEffect(() => {
    if (auth) {
      auth.signOutRedirect()
    }
  }, [])

  return <div>Redirecting...</div>
}

export default Login
