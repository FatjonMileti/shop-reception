import dayjs from 'dayjs'
import { get } from 'lodash'
import { getUserInfo } from './authService'
import { getCoreBaseUrl } from './api'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { formatErrorMessage } from 'utils/formatting'
import Resizer from 'react-image-file-resizer'

dayjs.extend(customParseFormat)

export const getCurrentDate = () => dayjs().format('YYYY-MM-DD')

export const getPreviousDay = date =>
  date
    ? dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
    : dayjs().subtract(1, 'day').format('YYYY-MM-DD')

export const formatPayloadDate = date => (date ? dayjs(date).format('YYYY-MM-DD') : '')

export const formatUIDate = date => (date ? dayjs(date).format('DD/MM/YYYY') : '')

export const getDatePickerDate = date => (date ? dayjs(date, 'DD/MM/YYYY') : '')

export const formatBakeryPayloadDate = date => (date ? dayjs(date).format('DD-MM-YYYY') : '')

export const formatPayloadTimeDate = date => (date ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '')

export const formatTime = date => (date ? dayjs(date).format('HH:mm') : '')

export const formatUITime = time => (time ? dayjs(time, 'HH:mm') : '')

export const formatCustomDate = date => (date ? dayjs(date) : '')

export const formatUIDateTime = date => (date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '')

export const areSameDayDates = (startDate, endDate) =>
  startDate && endDate && dayjs(startDate).isSame(dayjs(endDate), 'day')

export const isDayInThePast = date => dayjs().isAfter(date, 'day')

export const getDefaultItemValue = value => {
  if (value.charAt(0) === '#') {
    if (value === '#CURRENT_DATE') {
      return dayjs().format('YYYY-MM-DD')
    }

    if (value === '#YESTERDAY') {
      return dayjs().add(-1, 'day').format('YYYY-MM-DD')
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

    if (value === '#CHECKED') {
      return true
    }
  }

  return value
}

export const getItemDefaults = formItems =>
  formItems
    .filter(item => item.name)
    .reduce((acc, item) => {
      acc[item.name] =
        item.value || item.defaultValue ? getDefaultItemValue(item.value || item.defaultValue) : ''
      return acc
    }, {})

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

export const formatAndDownloadResponse = fileObject => {
  const { data, headers } = fileObject
  let fileName
  try {
    fileName = headers.get('Content-Disposition').split(';')[1].split('filename=')[1]
  } catch (error) {
    fileName = 'test.pdf'
  }
  const blobUrl = URL.createObjectURL(data)

  const link = document.createElement('a')
  link.href = blobUrl
  link.download = fileName
  link.click()

  URL.revokeObjectURL(blobUrl)
}

export const downloadFile = url => {
  const a = document.createElement('a')
  a.href = `${getCoreBaseUrl(url)}`
  a.setAttribute('download', 'FileName.pdf')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const delay = ms => new Promise(res => setTimeout(res, ms))

export const isScannerDevice = callbackOtherwise => {
  const devices = ['DT50', 'EF50'] // [urovo, bluebird]
  const { userAgent } = window.navigator
  if (devices.some(device => userAgent.includes(device))) return

  if (window.navigator?.userAgentData) {
    window.navigator.userAgentData.getHighEntropyValues(['model']).then(ua => {
      if (ua && ua.model && devices.some(device => ua.model.includes(device))) return
      else {
        // probably not on a device known to have infrared scanner
        callbackOtherwise()
      }
    })
  } else {
    // probably not on https, to be allowed access to .userAgentData
    callbackOtherwise()
  }
}

export const getFormErrors = (formItems, data) =>
  formItems.reduce((acc, item) => {
    if (item.required) {
      let itemValue
      if (item.UIComponent === 'CountyCitySelect') {
        const countyValue = get(data, item.county.payloadKey)
        const cityValue = get(data, item.city.payloadKey)
        if (!countyValue || !cityValue) {
          itemValue = ''
        } else {
          itemValue = `${countyValue}-${cityValue}`
        }
      } else {
        itemValue = item.payloadKey ? get(data, item.payloadKey) : get(data, item.name)
      }
      if (itemValue === '' || itemValue === undefined) {
        acc[item.name] = `${item.label || ''} is required`
      }
    }
    return acc
  }, {})

export const formatMonthsToRO = month => {
  switch (month) {
    case 'January':
      return 'Ianuarie'
    case 'February':
      return 'Februarie'
    case 'March':
      return 'Martie'
    case 'April':
      return 'Aprilie'
    case 'May':
      return 'Mai'
    case 'June':
      return 'Iunie'
    case 'July':
      return 'Iulie'
    case 'August':
      return 'August'
    case 'September':
      return 'Septembrie'
    case 'October':
      return 'Octombrie'
    case 'November':
      return 'Noiembrie'
    case 'December':
      return 'Decembrie'
    default:
      return
  }
}

export const handleQueryError = (error, message, showNotification) => {
  showNotification({
    message: `${message} ${formatErrorMessage(error)}`,
    type: 'error'
  })
}

export const toBoolean = input => {
  if (input === 'true') return true
  if (input === 'false') return false
}

export const resizeFile = ({
  file,
  maxWidth = 300,
  maxHeight = 300,
  compressFormat = 'JPEG',
  quality = 50,
  outputType = 'file'
}) => {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      0,
      uri => {
        resolve(uri)
      },
      outputType
    )
  })
}

export const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
