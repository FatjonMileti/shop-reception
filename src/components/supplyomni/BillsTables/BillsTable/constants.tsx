import dayjs from 'dayjs'
import { TableFilters } from './interaces'

export const ALL_RESOURCE_URI = '/supply-omni/order/paid'
export const WITH_INVOICE_RESOURCE_URI = '/supply-omni/order/with-invoice'
export const WITHOUT_INVOICE_RESOURCE_URI = '/supply-omni/order/without-invoice'

export const STORE_DELIVERY_TYPE = 'Livrare din magazin'

export const SHOW_INVOICE_BUTTON_LABEL = 'Vizualizare factura'
export const GENERATE_INVOICE_BUTTON_LABEL = 'Genereaza factura'

export const SUBMIT_MODAL_CONTENT =
  'Esti sigur ca ai pregatit comanda? Aceasta actiune nu mai poate fi anulata!'

export const tableColumns = [
  {
    title: 'Numar comanda',
    field: 'id',
    align: 'left'
  },
  {
    title: 'Data comanda',
    field: 'creationDate',
    align: 'left'
  },
  {
    title: 'Nume agent',
    field: 'agentName',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Nume client',
    field: 'clientName',
    align: 'left',
    disableSorting: true,
    collapsible: true
  },
  {
    title: 'Lista produse',
    field: 'productsName',
    align: 'left',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Tip livrare',
    field: 'deliveryType',
    align: 'left',
    collapsible: true,
    disableSorting: true
  },
  {
    title: 'Status',
    field: 'status',
    align: 'left',
    collapsible: true,
    disableSorting: true
  }
]

export const defaultTableFilters: TableFilters = {
  clientName: null,
  agentName: null,
  productsName: null,
  id: null,
  startDate: dayjs(new Date(), 'DD/MM/YYYY'),
  endDate: dayjs(new Date(), 'DD/MM/YYYY')
}
