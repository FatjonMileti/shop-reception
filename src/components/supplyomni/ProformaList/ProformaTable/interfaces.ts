import dayjs from 'dayjs'
import { BasePageResponseModel } from 'shared/interfaces'

export interface ProformaTableProps {
  proformaType?: ProformaType
}

export interface TableFilters {
  agentName: string
  clientName: string
  proformaId: number
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
  productsName: string
}

export interface TableRowModel {
  id: number
  proformaId: number
  creationDate: string
  agentName: string
  clientName: string
  products: string
  paid: boolean
  active: boolean
  clientId: string | number
}

export interface ProformaModel {
  id: number
  proformaId: number
  creationDate: Date
  agentName: string
  clientName: string
  products: ProductModel[]
  paid: boolean
  active: boolean
  clientId: string | number
}

export interface ProductModel {
  id: string
  name: string
}

export type ProformaListResponseModel = BasePageResponseModel<ProformaModel>

export type ProformaType = 'all' | 'active'
