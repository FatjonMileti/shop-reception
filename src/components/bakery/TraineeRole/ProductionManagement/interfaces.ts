import { Filter } from 'components/core-ui/Table/TableDefinitions'

export interface TableState {
  order: string
  orderBy: string
  tableFilters: Filter[]
}

interface TableItemListItem {
  average: number
  calculation: number
  end: string
  id: string
  name: string
  quantityToProduce: number
  start: string
}

export interface TableItem {
  average: number
  calculation: number
  clusterMandatory: boolean
  id: string
  imageUrl: string
  inPromotion: boolean
  list: TableItemListItem[]
  newProduct: boolean
  productMetiCode: number
  productName: string
  quantityToProduce: number
  familyName: string
  subfamily: string
  username: string
}

export interface FamilyItem {
  id: string
  name: string
}

export interface SubfamilyItem {
  index: number
  subFamily: string
}
