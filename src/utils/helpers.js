import dayjs from 'dayjs'
import { get } from 'lodash'
import { getUserInfo } from './authService'

export const formatPayloadDate = date => dayjs(date).format('YYYY-MM-DD')

export const formatUIDate = date => dayjs(date).format('DD/MM/YYYY')

export const getDefaultItemValue = value => {
  if (value.charAt(0) === '#') {
    if (value === '#CURRENT_DATE') {
      return dayjs().format('MM-DD-YYYY')
    }

    if (value.includes('#TOKEN')) {
      const userInfo = getUserInfo()
      return get(userInfo, value.replace('#TOKEN.', ''))
    }
  }

  return value
}

export const getItemDefaults = formItems => {
  let result = {}

  formItems.forEach(item => {
    result[item.name] = item.defaultValue ? getDefaultItemValue(item.defaultValue) : ''
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
