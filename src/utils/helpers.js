import dayjs from 'dayjs'
import { get } from 'lodash'
import { getUserInfo } from './authService'
import { getCoreBaseUrl } from './api'

export const formatPayloadDate = date => (date ? dayjs(date).format('YYYY-MM-DD') : '')

export const formatUIDate = date => (date ? dayjs(date).format('DD/MM/YYYY') : '')

export const getDefaultItemValue = value => {
  if (value.charAt(0) === '#') {
    if (value === '#CURRENT_DATE') {
      return dayjs().format('YYYY-MM-DD')
    }

    if (value.includes('#TOKEN')) {
      const userInfo = getUserInfo()
      return get(userInfo, value.replace('#TOKEN.', ''))
    }

    if (value.includes('QUERY_PARAM')) {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get(value.replace('#QUERY_PARAM.', ''))
    }

    if (value.includes('PATH_PARAM')) {
      const url = window.location.pathname
      return url.substring(url.lastIndexOf('/') + 1)
    }
  }

  return value
}

export const getItemDefaults = formItems => {
  let result = {}

  formItems
    .filter(item => item.name)
    .map(item => {
      result[item.name] = item.defaultValue ? getDefaultItemValue(item.defaultValue) : ''
      result[item.name] = item.value ? getDefaultItemValue(item.value) : ''
    })

  return result
}

export const getItemDefaultsAsArray = formItems => {
  let result = []

  formItems.forEach(item => {
    result.push({
      name: item.name,
      value: item.defaultValue ? getDefaultItemValue(item.defaultValue) : ''
    })
  })

  return result
}

export const isAllowed = (allowedRoles, currentUserRoles) =>
  allowedRoles && currentUserRoles.some(r => allowedRoles.includes(r))

export const downloadFile = url => {
  const a = document.createElement('a')
  a.href = `${getCoreBaseUrl(url)}`
  a.setAttribute('download', `FileName.pdf`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const delay = ms => new Promise(res => setTimeout(res, ms))

export const isScannerDevice = () => {
  const devices = ['DT50', 'EF50'] // [urovo, bluebird]
  const { userAgent } = window.navigator
  return devices.some(device => userAgent.includes(device))
}
