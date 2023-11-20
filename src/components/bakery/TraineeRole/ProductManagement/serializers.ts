export const toStoreFilterItems = items => items.map(item => ({
  label: item.name || '',
  value: item.id || '',
}))