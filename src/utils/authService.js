import { TOKEN_KEY } from 'utils/constants'
import { isTokenExpired } from './jwtHelper'
import jwt_decode from 'jwt-decode'

export const oidcConfig = {
  onSignIn: async user => {
    setToken(user.id_token)
    window.location.href = '/'
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

export const setTokenInConfig = (token, config) => {
  if (isTokenExpired(token)) {
    // TODO: what should be done here? We shouldn't get into this situation as the oidc-client should handle this
    console.log('token expired????????????')
  }

  if (!config.headers.Authorization) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
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

export const logout = () => {
  removeToken()
}

export const getUserInfo = () => {
  const token = getToken()
  try {
    return token && jwt_decode(token)
  } catch (e) {
    console.log('token is not valid')
  }
}

export const getUserRoles = () => {
  const userInfo = getUserInfo()

  return userInfo.resource_access[process.env.CLIENT_ID].roles
}
