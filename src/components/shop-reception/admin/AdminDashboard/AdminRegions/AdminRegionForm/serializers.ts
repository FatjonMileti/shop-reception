export const toTableRowItems = (items: AdminRegion[]) => items.map((item: AdminRegion) => ({
  id: item.id,
  code: item.code,
  name: item.name,
  responsible: item.responsible,
  active: item.active
}))