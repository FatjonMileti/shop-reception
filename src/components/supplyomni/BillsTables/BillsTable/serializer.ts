import { formatUIDate } from 'utils/helpers'
import { BillModel, TableRowModel } from './interaces'

export const toTableRowItems = (items: BillModel[]): TableRowModel[] =>
  items.map((item: BillModel) => ({
    id: item.id,
    agentName: item.agentName,
    clientName: item.clientName,
    clientId: item.clientId,
    clientType: item.clientType,
    creationDate: formatUIDate(item.creationDate),
    deliveryType: item.deliveryType,
    productsName: item.products.map(product => product.name).join(', '),
    status: item.status,
    prepared: item.prepared
  }))
