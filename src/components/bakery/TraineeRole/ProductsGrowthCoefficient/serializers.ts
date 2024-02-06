export const toTableRowItems = items =>
  items.map(item => ({
    productName: item.productName || '',
    metiCode: item.metiCode || '',
    familyName: item.familyName || '',
    familyCode: item.familyCode || '',
    generalGrowth: item.generalGrowth || 0,
    username: item.username || '',
    lastChange: item.lastChange || '',
    growth: item.growth || 0
  }))
