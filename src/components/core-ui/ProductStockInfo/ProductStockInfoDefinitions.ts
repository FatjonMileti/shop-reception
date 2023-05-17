export interface ProductStockInfoItem {
  name: string
  label: string
  suffix: string
}

export interface OtherStocksActions {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  href: string
}

export interface ProductStockActions {
  otherStocks: OtherStocksActions
}

export interface ProductStockInfoProps {
  type: string
  icon: string
  title: string
  infoItems: ProductStockInfoItem[]
  actions?: ProductStockActions
}
