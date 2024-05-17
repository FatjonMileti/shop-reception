export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    depositName: item.depositName || '',
    shopName: item.shopName || '',
    hubName: item.hubName || '',
    hasNotice: item.hasNotice || false,
    hasTransportNote: item.hasTransportNote || false,
    arrivalConform: item.arrivalConform || false,
    approvedBy: item.approvedBy || '',
    approvedDate: item.approvedDate || '',
  }))
