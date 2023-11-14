import { get } from 'lodash'

export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    metiCode: item.metiCode || '',
    divisionType: item.divisionType || '',
    parentSociety: item.parentSociety || '',
    region: item.region || '',
    zone: item.zone || '',
    enable: item.enable,
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