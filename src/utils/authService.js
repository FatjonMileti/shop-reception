import { URLS, TOKEN_KEY } from 'utils/constants'
import { isTokenExpired } from './jwtHelper'
import jwt_decode from 'jwt-decode'
import { makeCoreGetRequest } from 'utils/api'

export const oidcConfig = {
  onSignIn: async user => {
    setToken(user.id_token)
    window.location.href = '/'
  },
  authority: 'http://localhost:8283/realms/crf',
  clientId: 'client_dex_be',
  responseType: 'code',
  redirectUri: 'http://localhost:8080/login',
  scope: 'openid profile',
  postLogoutRedirectUri: 'http://localhost:8080/signout-oidc',
  filterProtocolClaims: true,
  loadUserInfo: true,
  code_challenge_method: 'S256',
  code_challenge: 'BoDjvTpczEfPkCvoHQR5RNb2yCBwK-ssaAjhQQCQ9d0'
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

export const getUser = () => {
  const token = getToken()
  try {
    return token && jwt_decode(token)
  } catch (e) {
    logout()
    window.location.href = URLS.LOGIN
  }
}

export const isAdmin = () => {
  try {
    if (isAuthenticated()) {
      return jwt_decode(getToken()).auth.some(r => r === 'ROLE_ADMIN')
    }
    return false
  } catch (e) {
    logout()
    window.location.href = URLS.LOGIN
  }
}

export const getUserRoles = () => {
  try {
    if (isAuthenticated()) {
      return jwt_decode(getToken()).auth
    }
    return false
  } catch (e) {
    logout()
    window.location.href = URLS.LOGIN
  }
}
