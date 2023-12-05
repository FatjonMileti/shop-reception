import { get } from 'lodash'

export const toTableRowItems = items => items.map(item => ({
    productName: item.productName || '',
    productMetiCode: item.productMetiCode || '',
    inPromotion: item.inPromotion,
    newProduct: item.newProduct,
    username: item.username || '',
    average: item.average || 0,
    calculation: item.calculation || 0,
    quantityToProduce: item.quantityToProduce || 0,
    realSales: item.realSales || 0,
    clearanceSales: item.clearanceSales || 0,
    list: item.list || [],
    clusterMandatory: item.clusterMandatory
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