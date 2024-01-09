
export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    metiCode: item.metiCode || 0,
    pluCode: item.pluCode || '',
    familyModuleName: item.familyModuleName || '',
    imageUrl: item.imageUrl || '',
    cluster: item.cluster || '',
    batch: item.batch || true
  }))
