export const toProduct = product => {
  const { name, ean, price, code, storeStock, warehouseStock } = product

  return {
    title: name,
    storeStock: {
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: code,
      available: storeStock.availableQuantity,
      sold: storeStock.soldQuantity,
      reserved: storeStock.reservedQuantity,
      initialStock: storeStock.initialQuantity,
      hasBuyback: storeStock.hasBuyback,
      buybackOptions: storeStock.buybackOptions,
      isWarehouse: false
    },
    warehouseStock: {
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: code,
      available: warehouseStock?.availableQuantity,
      sold: warehouseStock?.soldQuantity,
      reserved: warehouseStock?.reservedQuantity,
      initialStock: warehouseStock?.initialQuantity,
      hasBuyback: warehouseStock?.hasBuyback,
      buybackOptions: warehouseStock?.buybackOptions,
      isWarehouse: true
    }
  }
}
