export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName || '',
    hubName: item.hubName || '',
    conform: item.conform || '',
    arrivalTemperature: item.arrivalTemperature || '',
    approvedBy: item.approvedBy || '',
    approvedDate: item.approvedDate || '',
    truckSealStatusValue: item.truckSealStatusValue || ''
  }))
