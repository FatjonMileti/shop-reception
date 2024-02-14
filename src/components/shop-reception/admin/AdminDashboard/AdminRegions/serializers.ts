export const toTableRowItems = (items: AdminRegion[]) => items.map((item: AdminRegion) => ({
  id: item.id,
  regionCode: item.regionCode,
  name: item.name,
  regionManager: item.regionManager,
  active: item.active
}))