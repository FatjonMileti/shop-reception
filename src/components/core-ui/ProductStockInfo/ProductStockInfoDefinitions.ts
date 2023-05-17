import { Action } from 'components/utils/definitions/Definitions'

export interface ProductStockInfoItem {
  name: string
  label: string
  suffix: string
}

export interface ViewOtherStocksActions {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  href: string
}

export interface AddToCartActions {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  action: Action
  href: string
}

export interface ProductStockActions {
  viewOtherStocks?: ViewOtherStocksActions
  addToCart: AddToCartActions
}

export interface ProductStockInfoProps {
  type: string
  icon: string
  title: string
  infoItems: ProductStockInfoItem[]
  actions: ProductStockActions
}
