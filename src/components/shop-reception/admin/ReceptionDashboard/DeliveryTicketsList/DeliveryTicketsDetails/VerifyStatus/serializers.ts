import { DeliveryTicketDetails } from '../../interfaces'

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    statusValue: item.statusValue || '',
    createdBy: item.createdBy || '',
    created: item.created || '',
    updatedBy: item.updatedBy || '',
    updated: item.updated || ''
  }))
