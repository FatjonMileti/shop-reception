export const toProduct = product => {
  const { name, ean, price, code, storeStock, warehouseStock, id } = product

  return {
    title: name,
    storeStock: {
      id,
      price,
      currency: 'lei',
      eanCode: ean,
      storeCode: code,
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
      storeCode: code,
      available: warehouseStock?.availableQuantity,
      sold: warehouseStock?.soldQuantity,
      reserved: warehouseStock?.reservedQuantity,
      initialStock: warehouseStock?.initialQuantity,
      hasBuyback: !!warehouseStock?.buybackOptions?.length,
      buybackOptions: warehouseStock?.buybackOptions,
      isWarehouse: true
    }
  }
}
