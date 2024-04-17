import { DeliveryTicketDetails } from '../../interfaces'

export const toTableRowItems = (items: DeliveryTicketDetails[]) =>
  items.map((item: DeliveryTicketDetails) => ({
    id: item.id,
    supportStatus: item.supportStatus || '',
    q: '',
    w: '',
    e: '',
    r: '',
    t: '',
    y: '',
    u: ''
  }))
