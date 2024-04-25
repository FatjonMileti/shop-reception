export const toTableRowItems = (items: AdminHub[]) => items.map((item: AdminHub) => ({
  id: item.id,
  code: item.code || '',
  name: item.name || '',
  type: item.type || '',
  address: item.address || '',
  active: item.active || false
}))