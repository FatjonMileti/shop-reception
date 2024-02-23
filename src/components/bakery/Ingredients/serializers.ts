
export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    metiCode: item.metiCode || 0,
    pluCode: item.pluCode || '',
    familyName: item.familyName || '',
    imageUrl: item.imageUrl || '',
    cluster: item.cluster || '',
    batch: item.batch || false,
    productName: item.productName || '',
  }))
