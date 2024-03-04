import { Product } from '../interfaces'

export const toAddToCartPayload = (product: Product, selectedBuybackOption: string) => ({
  id: product.id,
  quantity: 1,
  isWarehouse: product.isWarehouse,
  purchaseOption: selectedBuybackOption,
  locationId: product.locationId
})
