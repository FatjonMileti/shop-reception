export const toProduct = product => {
  const {
    title,
    ean,
    price,
    internalCode,
    availableStock,
    soldStock,
    reservedStock,
    initialStock,
    neighbours,
    hasBuyback,
    buybackOptions
  } = product

  return {
    title: title,
    storeStock: {
      price: price,
      currency: 'lei',
      eanCode: ean,
      storeCode: internalCode,
      available: availableStock,
      sold: soldStock,
      reserved: reservedStock,
      initialStock: initialStock,
      hasBuyback: hasBuyback,
      buybackOptions: buybackOptions,
      isWarehouse: false
    },
    warehouseStock: {
      price: neighbours[0]?.price || price,
      currency: 'lei',
      eanCode: neighbours[0]?.ean || ean,
      storeCode: neighbours[0]?.internalCode || internalCode,
      available: neighbours[0]?.availableStock,
      sold: neighbours[0]?.soldStock,
      reserved: neighbours[0]?.reservedStock,
      initialStock: neighbours[0]?.initialStock,
      hasBuyback: neighbours[0]?.hasBuyback,
      buybackOptions: neighbours[0]?.buybackOptions,
      isWarehouse: true
    }
  }
}
