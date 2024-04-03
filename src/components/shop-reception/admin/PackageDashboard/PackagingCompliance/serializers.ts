export const toTableRowItems = (items: PackagingCompliance[]) => items.map((item: PackagingCompliance) => ({
  id: item.id,
  store: item.store,
  warehouse: item.warehouse,
  deliverySlip: item.deliverySlip,
  supportType: item.supportType,
  supportCode: item.supportCode,
  supportCompliance: item.supportCompliance,
  receptionDate: item.receptionDate,
  downloadImages: item.downloadImages
}))