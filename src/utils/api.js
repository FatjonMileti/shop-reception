import axios from 'axios'
import { getToken, setTokenInConfig } from './authService'
import { delay } from './helpers'

axios.interceptors.request.use(
  async config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'

    let token = getToken()

    if (!token) {
      console.log('no token yet!!!!!!!!')
      await delay(2000)
      token = getToken()
      setTokenInConfig(token, config)

      if (token) {
        return config
      } else {
        console.log('still no token yet!!!!!!!!')
        await delay(10000)
        token = getToken()
        setTokenInConfig(token, config)
        return config
      }
    } else {
      setTokenInConfig(token, config)
      return config
    }
  },
  error => Promise.reject(error)
)

export const getRmBaseUrl = url => `${process.env.RM_URL}${url}`

export const getCoreBaseUrl = url => `${process.env.CORE_URL}${url}`

export const getDesignerBaseUrl = url => `${process.env.DESIGNER_URL}${url}`

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

  export const makeRmGetRequest = (url, params) =>
    axios.get(getRmBaseUrl(url), params).then(response => response.data)
  
  export const makeRmPostRequest = (url, params, config = {}) =>
    axios.post(getRmBaseUrl(url), params, config).then(response => response.data)
  
  export const makeRmPutRequest = (url, params) =>
    axios.put(getRmBaseUrl(url), params).then(response => response.data)
  
  export const makeRmDeleteRequest = (url, params) =>
    axios.delete(getRmBaseUrl(url), params).then(response => response.data)
  
  export const makeRmPatchRequest = (url, params) =>
    axios.patch(getRmBaseUrl(url), params).then(response => response.data)

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

export const makeCoreGetFileRequest = (url, params) =>
  axios.get(getCoreBaseUrl(url), params).then(response => response)
