import * as React from 'react'
import { signinRedirect } from 'utils/authService'

const Login = () => {
  React.useEffect(() => {
    ;(async () => {
      try {
        await signinRedirect()
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return null
}

export default Login
