export interface NeighboursStock {
  availableQuantity: number
  storeName: string
}

export interface PurchaseOptions {
  value: string
  label: string
}

export interface Product {
  available: number
  currency: string
  eanCode: string
  hasBuyback: boolean
  id: string
  initialStock: number
  isWarehouse: boolean
  price: number
  reserved: number
  sold: number
  storeCode: string
  purchaseOptions: PurchaseOptions[]
  locationId: number
  state?: 'ACTIVE' | 'INACTIVE'
}

export interface ProductStockResponse {
  title: string
  storeStock: Product
  warehouseStock: Product
  neighboursStock: NeighboursStock[]
}
