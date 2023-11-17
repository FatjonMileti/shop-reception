import { get } from 'lodash'

export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    storeName: item.storeName || '',
    username: item.username || '',
    lastAccess: item.lastAccess || '',
    lastChange: item.lastChange || '',
    applicationReportDynamicDtos: item.applicationReportDynamicDtos || []
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