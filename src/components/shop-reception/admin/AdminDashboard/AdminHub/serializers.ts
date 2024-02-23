export const toTableRowItems = (items: AdminHub[]) => items.map((item: AdminHub) => ({
  id: item.id,
  hubCode: item.hubCode,
  name: item.name,
  hubType: item.hubType,
  address: item.address,
  hourlyIntervals: item.hourlyIntervals,
  active: item.active
}))