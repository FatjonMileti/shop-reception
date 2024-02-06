export const toTableRowItems = items =>
  items.map(item => ({
    name: item.name || '',
    growth: item.growth || 0,
    username: item.username || '',
    lastChange: item.lastChange || ''
  }))
