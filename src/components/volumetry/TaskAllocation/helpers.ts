export const toEmployeeFilterItems = items =>
  items.map(item => ({
    label: item.name || '',
    value: item.id || ''
  }))
