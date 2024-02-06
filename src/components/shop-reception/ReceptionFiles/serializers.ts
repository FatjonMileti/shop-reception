export const toTableRowItems = (items: ReceptionFile[]) => items.map((item: ReceptionFile) => ({
  id: item.id,
  deliverySlip: item.deliverySlip,
  warehouse: item.warehouse,
  store: item.store,
  date: item.date,
  success: item.success,
  failureReason: item.failureReason,
  fileDownloaded: item.fileDownloaded,
  reProcessing: item.reProcessing
}))