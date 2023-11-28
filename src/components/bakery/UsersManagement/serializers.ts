import { get } from 'lodash'

export const toTableRowItems = items => items.map(item => ({
  id: item.id || '',
  firstName: item.firstName || '',
  lastName: item.lastName || '',
  enable: item.enable,
  roles: item.roles || [],
  storeName: item.storeName || '',
  regionName: item.regionName || ''
}))

export const toAsyncSelectLabel = (item, labelKey) =>
  labelKey
    .split('|')
    .map(key => get(item, key))
    .join(' - ')

export const toAsyncSelectOptions = (data, valueKey, labelKey) =>
  data.map(item => ({
    value: get(item, valueKey),
    label: toAsyncSelectLabel(item, labelKey)
}))