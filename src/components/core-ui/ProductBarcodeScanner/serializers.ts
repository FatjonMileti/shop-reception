export const toProduct = product => {
  const { id, name, ean, price, internalCode, storeStock, warehouseStock, neighboursStock } =
    product

  return {
    title: name,
    storeStock: {
      id,
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: internalCode,
      available: storeStock.availableQuantity,
      sold: storeStock.soldQuantity,
      reserved: storeStock.reservedQuantity,
      initialStock: storeStock.initialQuantity,
      hasBuyback: !!storeStock.purchaseOptions?.length,
      purchaseOptions: storeStock.purchaseOptions,
      isWarehouse: false,
      state: storeStock.productState,
      locationId: storeStock.locationId
    },
    warehouseStock: {
      id,
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: internalCode,
      available: warehouseStock[0].availableQuantity,
      sold: warehouseStock[0].soldQuantity,
      reserved: warehouseStock[0].reservedQuantity,
      initialStock: warehouseStock[0].initialQuantity,
      hasBuyback: !!warehouseStock[0].purchaseOptions?.length,
      purchaseOptions: warehouseStock[0].purchaseOptions,
      isWarehouse: true,
      state: warehouseStock[0].productState,
      locationId: warehouseStock[0].locationId
    },
    neighboursStock:
      neighboursStock?.map(stock => ({
        name: stock.storeName,
        available: stock.availableQuantity,
        sold: stock.soldQuantity,
        reserved: stock.reservedQuantity,
        initialStock: stock.initialQuantity
      })) ?? []
  }
}
