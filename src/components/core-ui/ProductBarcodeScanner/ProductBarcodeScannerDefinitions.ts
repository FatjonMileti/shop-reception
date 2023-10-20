import { Action } from 'components/utils/definitions/Definitions'

export interface ProductBarcodeScannerProps {
  action: Action
}

export interface Product {
  title: string
}

export interface ProductStock {
  price?: number
  currency?: string
  eanCode?: string
  storeCode?: string
  available: number
  sold: number
  reserved: number
  initialStock: number
  imobStock: number,
  hasBuyback?: boolean,
  buybackOptions?: any,
  name?: string
}

export interface ProductStockResponse {
  product: {
    title: string
    storeStock: ProductStock
    warehouseStock: ProductStock
  }
}
