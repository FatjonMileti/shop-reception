import { TableFilters } from './models'

export const RESOURCE_URI = '/supply-omni/reports'

export const tableColumns = [
  {
    title: 'Data',
    field: 'orderCreationDate',
    align: 'left',
    disableSorting: true
  },
  {
    title: 'Denumire',
    field: 'productName',
    align: 'left',
    disableSorting: true
  },
  {
    title: 'Cod EAN',
    field: 'productEan',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Numar Proforma',
    field: 'proformaId',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Pret Unitar',
    field: 'productPrice',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Cantitate',
    field: 'productQuantity',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Pret Total',
    field: 'totalPrice',
    align: 'left',
    disableSorting: true,
    collapsible: true
  }
]

export const defaultTableFilters: TableFilters = {
  startDate: new Date(),
  endDate: new Date()
}
