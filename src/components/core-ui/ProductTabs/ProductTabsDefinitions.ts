import { ProductStockInfoProps } from "../ProductStockInfo/ProductStockInfoDefinitions"

export interface ProductTab {
  content: ProductStockInfoProps
  label: string
  tabIndex: number
}

export interface ProductTabsProps {
  value: number
  id: string
  tabs: ProductTab[]
}