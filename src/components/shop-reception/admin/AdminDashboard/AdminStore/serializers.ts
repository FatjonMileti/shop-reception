export const toTableRowItems = (items: AdminStore[]) => items.map((item: AdminStore) => ({
  id: item.id,
  storeCode: item.storeCode,
  name: item.name,
  storeType: item.storeType,
  METIVersion: item.METIVersion,
  adCode: item.adCode,
  grams: item.grams,
  region: item.region,
  ip: item.ip,
  way: item.way,
  quantities: item.quantities,
  active: item.active,
  hourlyIntervals: item.hourlyIntervals
}))