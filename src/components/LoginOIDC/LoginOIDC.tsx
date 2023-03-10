import * as React from 'react'
import { signinRedirectCallback } from 'utils/authService'
import { useNavigate } from 'react-router-dom'
import { URLS } from 'utils/constants'

const LoginOIDC = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    ;(async () => {
      try {
        await signinRedirectCallback()
        debugger
        navigate(URLS.HOME)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return null
}

export default LoginOIDC
