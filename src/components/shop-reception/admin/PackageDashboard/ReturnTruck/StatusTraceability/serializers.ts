import { formatUIDateTime } from 'utils/helpers'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    deliveryStatusValue: item.deliveryStatus.value ?? '',
    truckTypeValue: item.truckType.value ?? '',
    createdBy: item.createdBy ?? '',
    created: item.created ? formatUIDateTime(item.created) : '',
    updatedBy: item.updatedBy ?? '',
    updated: item.updated ? formatUIDateTime(item.updated) : ''
  }))
