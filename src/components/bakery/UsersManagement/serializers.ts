export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    lastName: item.lastName,
    firstName: item.firstName,
    storeName: item.storeName || [''],
    regionName: item.regionName || '',
    roles: item.roles,
    status: item.enable
  }))
