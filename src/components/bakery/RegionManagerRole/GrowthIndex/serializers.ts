export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    name: item.name || '',
    growth: item.growth || 0,
    username: item.username || '',
    lastChange: item.lastChange || '',
    divisionType: item.divisionType || ''
}))