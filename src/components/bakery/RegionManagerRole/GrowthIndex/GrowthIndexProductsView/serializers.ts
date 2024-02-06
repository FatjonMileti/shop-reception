export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    productName: item.productName || '',
    imageUrl: item.imageUrl || '',
    metiCode: item.metiCode || '',
    familyCode: item.familyCode || '',
    familyName: item.familyName || '',
    generalGrowth: item.generalGrowth || 0,
    username: item.username || '',
    lastChange: item.lastChange || '',
    list: item.list || []
}))
