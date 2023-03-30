import { get } from 'lodash'

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
