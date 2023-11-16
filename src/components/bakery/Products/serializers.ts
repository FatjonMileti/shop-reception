
export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    metiCode: item.metiCode || '',
    pluCode: item.pluCode || '',
    familyModuleName: item.familyModuleName || '',
    imageUrl: item.imageUrl || ''
  }))
