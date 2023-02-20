import axios from 'axios'
import { URLS, URL } from 'utils/constants'
import { getToken, logout } from './authService'
import { isTokenExpired } from './jwtHelper'

axios.interceptors.request.use(
  config => {
    const token = getToken()

    if (!config.headers.Authorization) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    if (isTokenExpired(token)) {
      logout()
      window.location.href = URLS.LOGIN
    }

    return config
  },
  error => Promise.reject(error)
)

export const getBaseUrl = url => {
  return `${URL[process.env.ENV]}${url}`
}

export const getRequest = url => {
  return axios.get(getBaseUrl(url)).then(response => response.data)
}

export const makeGetRequest = (url, params) => {
  return axios.get(url, params).then(response => response.data)
}

export const makePostRequest = (url, params, config = {}) =>
  axios.post(getBaseUrl(url), params, config).then(response => response.data)

export const makePutRequest = (url, params) =>
  axios.put(getBaseUrl(url), params).then(response => response.data)

export const makeDeleteRequest = (url, params) =>
  axios.delete(getBaseUrl(url), params).then(response => response.data)

export const makePatchRequest = (url, params) =>
  axios.patch(getBaseUrl(url), params).then(response => response.data)

export const loginRedirect = navigate => {
  navigate(URLS.AUTH_HOME, { replace: true })
}
