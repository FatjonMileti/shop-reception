import { TableFilters } from './models'

export const RESOURCE_URI = '/supply-omni/sales'

export const tableColumns = [
  {
    title: 'Data',
    field: 'orderCreationDate',
    align: 'left'
  },
  {
    title: 'Denumire',
    field: 'productName',
    align: 'left'
  },
  {
    title: 'Cod EAN',
    field: 'productEan',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Pret unitar',
    field: 'productPrice',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Cantitate',
    field: 'productQuantity',
    align: 'left',
    collapsible: true
  },
  {
    title: 'Pret total',
    field: 'totalPrice',
    align: 'left',
    collapsible: true
  }
]

export const defaultTableFilters: TableFilters = {
  startDate: new Date(),
  endDate: new Date()
}
