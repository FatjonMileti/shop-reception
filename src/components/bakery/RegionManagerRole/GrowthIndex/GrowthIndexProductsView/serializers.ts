export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    productName: item.productName || '',
    imageUrl: item.imageUrl || '',
    metiCode: item.metiCode || '',
    familyName: item.familyName || '',
    familyCode: item.familyCode || '',
    generalGrowth: item.generalGrowth || '',
    username: item.username || '',
    lastChange: item.lastChange || '',
    list: item.list || []
}))
