export const toTableRowItems = (items: ScanType[]) => items.map((item: ScanType) => ({
  id: item.id,
  storeType: item.scanType,
  region: item.region,
  storeCode: item.storeCode,
  storeName: item.storeName,
  scanType: item.scanType,
  startDate: item.startDate,
  lastDate: item.lastDate,
  active: item.active,
}))