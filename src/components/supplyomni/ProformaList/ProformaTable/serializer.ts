import { formatUIDate } from 'utils/helpers'
import { ProformaModel, TableRowModel } from './interfaces'

export const toTableRowItems = (items: ProformaModel[]): TableRowModel[] =>
  items.map((item: ProformaModel) => ({
    id: item.id,
    proformaId: item.proformaId,
    creationDate: formatUIDate(item.creationDate),
    agentName: item.agentName,
    clientName: item.clientName,
    products: item.products.map(product => product.name).join(', '),
    paid: item.paid,
    active: item.active,
    clientId: item.clientId
  }))
