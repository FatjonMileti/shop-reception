export const toTableRowItems = items =>
  items.map(item => ({
    productName: item.productName || '',
    metiCode: item.metiCode || '',
    familyCode: item.familyCode || '',
    generalGrowth: item.generalGrowth || '',
    username: item.username || '',
    lastChange: item.lastChange || '',
    growth: item.growth || ''
  }))
