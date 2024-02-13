export const toTableRowItems = (items: PackagingTypesDifference[]) => items.map((item: PackagingTypesDifference) => ({
  id: item.id,
  warehouse: item.warehouse,
  store: item.store,
  hub: item.hub,
  society: item.society,
  supportCode: item.supportCode,
  deliverySlip: item.deliverySlip,
  expectedSupportType: item.expectedSupportType,
  supportTypeConfirmed: item.supportTypeConfirmed,
  registrationNumber: item.registrationNumber,
  date: item.date,
  downloadImages: item.downloadImages
}))