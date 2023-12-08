export const toTableRowItems = items =>
  items.map(item => ({
    productName: item.productName || '',
    productMetiCode: item.productMetiCode || '',
    productImageUrl: item.productImageUrl || '',
    inPromotion: item.inPromotion || '',
    clusterMandatory: item.clusterMandatory || [],
    newProduct: item.newProduct || [],
    username: item.username || [],
    average: item.average || [],
    calculation: item.calculation || [],
    quantityToProduce: item.quantityToProduce || [],
    clearanceSales: item.clearanceSales || [],
  }))
