export const toTableRowItems = items =>
  items.map(item => ({
    name: item.name || '',
    growth: item.growth || '',
    username: item.username || '',
    lastChange: item.lastChange || ''
  }))
