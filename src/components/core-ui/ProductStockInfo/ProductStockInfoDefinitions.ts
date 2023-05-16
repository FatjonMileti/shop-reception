export interface ProductStockInfoItem {
  name: string
  label: string
  suffix: string
}

export interface ProductStockInfoProps {
  type: string
  icon: string
  title: string
  infoItems: ProductStockInfoItem[]
}
