import { TOKEN_KEY } from 'utils/constants'
import { isTokenExpired } from './jwtHelper'
import { makeCoreGetRequest } from 'utils/api'

export const oidcConfig = {
  onSignIn: async user => {
    setToken(user.id_token)
    window.location.href = '/'
  },
  onSignOut: async options => {
    debugger
  },
  authority: process.env.AUTHORITY,
  clientId: process.env.CLIENT_ID,
  responseType: 'code',
  redirectUri: process.env.REDIRECT_URI,
  scope: 'openid profile',
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  filterProtocolClaims: true,
  loadUserInfo: true
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken()

  if (token) {
    return !isTokenExpired(token)
  } else {
    return false
  }
}

export const authenticate = token => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const setToken = token => {
  authenticate(token)
}

export const refreshToken = async () => {
  const token = await makeCoreGetRequest('/v1/users/refresh')
  setToken(token)
}

export const logout = () => {
  removeToken()
}
