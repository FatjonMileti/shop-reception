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
  subfamily: string
  username: string
}

export interface SubfamilyItem {
  index: number
  subFamily: string
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

export interface EditProductionItem {
  id: string;
  productName: string;
  productMetiCode: number;
  imageUrl: string;
  average: number;
  calculation: number;
  quantityToProduce: number;
  inPromotion: boolean;
  clusterMandatory: boolean;
  newProduct: boolean;
  username: string;
  predictionDate: string;
  map: {
    interval1: TableItemListItem,
    interval2: TableItemListItem,
    interval3: TableItemListItem,
    interval4: TableItemListItem,
    interval5: TableItemListItem
  }
}

export interface EditProductionForm {
  map: {
    interval1: {
      quantityToProduce: number
    },
    interval2: {
      quantityToProduce: number
    },
    interval3: {
      quantityToProduce: number
    },
    interval4: {
      quantityToProduce: number
    },
    interval5: {
      quantityToProduce: number
    },
  }
}