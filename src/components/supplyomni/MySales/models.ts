import { Filter } from 'components/core-ui/Table/TableDefinitions'
import { BasePageResponseModel } from 'shared/models'

export interface TableState {
  order: string
  orderBy: string
  tableFilters: Filter[]
}

export interface TableFilters {
  startDate: Date
  endDate: Date
}

export interface TableRowModel {
  orderCreationDate: string
  productName: string
  productEan: string
  productPrice: number
  productQuantity: number
  totalPrice: number
}

export interface MySalesResponseModel extends BasePageResponseModel<SaleModel> {
  summary: SummaryModel
}

export interface SaleModel {
  id: number
  orderCreationDate: Date
  productEan: string
  productName: string
  productQuantity: number
  productPrice: number
  username: string
  totalPrice: number
  proformaId: number
}

export interface SummaryModel {
  totalItems: number
  totalPrice: number
}
