import axios from 'axios'
import { URLS, CORE_URL, DESIGNER_URL } from 'utils/constants'
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

export const getCoreBaseUrl = url => `${CORE_URL[process.env.ENV]}${url}`

export const getDesignerBaseUrl = url => `${DESIGNER_URL[process.env.ENV]}${url}`

export const makeCoreGetRequest = (url, params) =>
  axios.get(getCoreBaseUrl(url), params).then(response => response.data)

export const makeCorePostRequest = (url, params, config = {}) =>
  axios.post(getCoreBaseUrl(url), params, config).then(response => response.data)

export const makeCorePutRequest = (url, params) =>
  axios.put(getCoreBaseUrl(url), params).then(response => response.data)

export const makeCoreDeleteRequest = (url, params) =>
  axios.delete(getCoreBaseUrl(url), params).then(response => response.data)

export const makeCorePatchRequest = (url, params) =>
  axios.patch(getCoreBaseUrl(url), params).then(response => response.data)

export const makeDesignerGetRequest = (url, params) =>
  axios.get(getDesignerBaseUrl(url), params).then(response => response.data)

export const makeDesignerPostRequest = (url, params, config = {}) =>
  axios.post(getDesignerBaseUrl(url), params, config).then(response => response.data)

export const makeDesignerPutRequest = (url, params) =>
  axios.put(getDesignerBaseUrl(url), params).then(response => response.data)

export const makeDesignerDeleteRequest = (url, params) =>
  axios.delete(getDesignerBaseUrl(url), params).then(response => response.data)

export const makeDesignerPatchRequest = (url, params) =>
  axios.patch(getDesignerBaseUrl(url), params).then(response => response.data)

export const loginRedirect = () => {
  window.location.href = URLS.AUTH_HOME
}
