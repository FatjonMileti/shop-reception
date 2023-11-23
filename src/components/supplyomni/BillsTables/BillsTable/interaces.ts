import dayjs from 'dayjs'
import { BasePageResponseModel } from 'shared/interfaces'

export interface BillsTableProps {
  urlResource: string
  rowAction: RowActionType
}

export interface TableFilters {
  clientName: string
  agentName: string
  productsName: string
  id: number
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
}

export interface TableRowModel {
  id: number
  creationDate: string
  agentName: string
  clientName: string
  clientId: number
  productsName: string
  deliveryType: string
  status: string
  prepared: boolean
}

export interface ProductModel {
  id: string
  name: string
}

export interface BillModel {
  id: number
  creationDate: Date
  agentName: string
  clientName: string
  clientId: number
  products: ProductModel[]
  deliveryType: string
  status: string
  prepared: boolean
}

export interface DeliveryOptionModel {
  type: string
  description: string
}

export type BillsResponseModel = BasePageResponseModel<BillModel>

export enum RowActionType {
  PAID = 'Pregateste comanda',
  WITH_INVOICE = 'Vizualizare factura',
  WITHOUT_INVOICE = 'Genereaza factura'
}
