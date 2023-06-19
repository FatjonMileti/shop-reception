export const toProduct = product => {
  const {
    title,
    ean,
    price,
    internalCode,
    stock_available,
    soldStock,
    reservedStock,
    initialStock,
    stock_imob,
    neighbours
  } = product

  return {
    title: title,
    storeStock: {
      price: price,
      currency: 'lei',
      eanCode: ean,
      storeCode: internalCode,
      available: stock_available,
      sold: soldStock,
      reserved: reservedStock,
      initialStock: initialStock,
      imobStock: stock_imob,
      isWarehouse: false
    },
    warehouseStock: {
      price: neighbours[0]?.price || price,
      currency: 'lei',
      eanCode: neighbours[0]?.ean || ean,
      storeCode: neighbours[0]?.internalCode || internalCode,
      available: neighbours[0]?.stock_available,
      sold: neighbours[0]?.soldStock,
      reserved: neighbours[0]?.reservedStock,
      initialStock: neighbours[0]?.initialStock,
      imobStock: neighbours[0]?.stock_imob,
      isWarehouse: true
    }
  }
}
