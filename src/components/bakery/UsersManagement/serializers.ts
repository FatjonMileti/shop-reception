export const toTableRowItems = items => items.map(item => ({
  id: item.id,
  firstName: item.firstName || '',
  lastName: item.lastName || '',
  enable: item.enable,
  roles: item.roles || [''],
  storeName: item.storeName || '',
  regionName: item.regionName || ''
}))