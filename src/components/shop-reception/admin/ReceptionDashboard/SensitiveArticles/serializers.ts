export const toTableRowItems = (items: SensitiveArticle[]) =>
  items.map((item: SensitiveArticle) => ({
    id: item.id,
    dateInfo: item.dateInfo || '',
    donePercent: item.donePercent || '',
    idDeliverySupport: item.idDeliverySupport || '',
    lastUpdate: item.lastUpdate || '',
    scannedNo: item.scannedNo || '',
    shopName: item.shopName || '',
    verifiedNo: item.verifiedNo || ''
  }))
