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

export const getStructureRoles = (props) => {
  const {
    isTraceabilityOpChecked,
    isRegionManagerChecked,
    isStoreManagerChecked,
    isTraineeChecked,
    isAdmin,
    regionId,
    storeId,
    adminId,
    traceabilityId,
    regionMgValue,
    storeMgValue,
    traineeValue,
    traceabilityOpValue,
  } = props;
  return [
    ...(isRegionManagerChecked ? 
      [{
        "roleId": regionId,
        "structureId": regionMgValue.value,
        "structureType": "REGION"
      }] : []),
    ...(isStoreManagerChecked ? 
      [{
        "roleId": storeId,
        "structureId": storeMgValue.value,
        "structureType": "STORE"
      }] : []),
    ...(isTraineeChecked ? 
      [{
        "roleId": traineeValue.value,
        "structureId": null,
        "structureType": null
      }] : [])   ,
    ...(isAdmin ? 
      [{
        "roleId": adminId,
        "structureId": null,
        "structureType": null
      }] : []),
    ...(isTraceabilityOpChecked ?
      [{
        "roleId": traceabilityId,
        "structureId": traceabilityOpValue.value,
        "structureType": "STORE"
      }] : []),
  ]
}