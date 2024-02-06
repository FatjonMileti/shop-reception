export const toTableRowItems = (items: RollingPackages[]) => items.map((item: RollingPackages) => ({
  id: item.id,
  warehouse: item.warehouse,
  store: item.store,
  hub: item.hub,
  society: item.society,
  expectedSupportType: item.expectedSupportType,
  confirmedSupportType: item.confirmedSupportType,
  truckLocation: item.truckLocation,
  registrationNumber: item.registrationNumber,
  supportCode: item.supportCode,
  deliverySlip: item.deliverySlip,
  noticeNumber: item.noticeNumber,
  entry: item.entry,
  lesire: item.lesire,
  finalStockAfterInventory: item.finalStockAfterInventory,
  date: item.date,
  image: item.image
}))