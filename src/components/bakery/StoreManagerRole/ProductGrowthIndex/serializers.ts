export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    productName: item.productName || '',
    imageUrl: item.imageUrl || '',
    metiCode: item.metiCode || '',
    familyCode: item.familyCode || '',
    familyName: item.familyname || '',
    generalGrowth: item.generalGrowth || '',
    username: item.generalGrowth || '',
    lastChange: item.lastChange || '',
    list: item.list || [] 
  }))