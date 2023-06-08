export const toProduct = product => {
  const {
    title,
    ean,
    price,
    cod_intern,
    stock_available,
    stock_sold,
    stock_reserved,
    stock_initial,
    stock_imob,
    neighbours
  } = product

  return {
    title: title,
    storeStock: {
      price: price,
      currency: 'lei',
      eanCode: ean,
      storeCode: cod_intern,
      available: stock_available,
      sold: stock_sold,
      reserved: stock_reserved,
      initialStock: stock_initial,
      imobStock: stock_imob
    },
    warehouseStock: {
      price: neighbours[0]?.price || price,
      currency: 'lei',
      eanCode: neighbours[0]?.ean || ean,
      storeCode: neighbours[0]?.cod_intern || cod_intern,
      available: neighbours[0]?.stock_available,
      sold: neighbours[0]?.stock_sold,
      reserved: neighbours[0]?.stock_reserved,
      initialStock: neighbours[0]?.stock_initial,
      imobStock: neighbours[0]?.stock_imob
    }
  }
}
