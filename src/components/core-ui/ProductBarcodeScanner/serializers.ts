export const toProduct = product => {
  const { id, name, ean, price, internalCode, storeStock, warehouseStock, neighboursStock } = product

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
      hasBuyback: !!storeStock.buybackOptions?.length,
      buybackOptions: storeStock.buybackOptions,
      isWarehouse: false
    },
    warehouseStock: {
      id,
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: internalCode,
      available: warehouseStock?.availableQuantity,
      sold: warehouseStock?.soldQuantity,
      reserved: warehouseStock?.reservedQuantity,
      initialStock: warehouseStock?.initialQuantity,
      hasBuyback: !!warehouseStock?.buybackOptions?.length,
      buybackOptions: warehouseStock?.buybackOptions,
      isWarehouse: true
    },
    neighboursStock: neighboursStock?.map(stock => ({
      name: stock.storeName,
      available: stock.availableQuantity,
      sold: stock.soldQuantity,
      reserved: stock.reservedQuantity,
      initialStock: stock.initialQuantity
    })) ?? []
  }
}
