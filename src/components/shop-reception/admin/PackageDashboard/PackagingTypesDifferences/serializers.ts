export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    depositName: item.depositName ?? '',
    shopName: item.shopName ?? '',
    hubName: item.hubName ?? '',
    parentSociety: item.parentSociety ?? '',
    supportCode: item.supportCode ?? '',
    deliveryTicket: item.noticeNumber ?? '',
    supportTypeExpected: item.expectedSupportType ?? '',
    supportTypeConfirmed: item.confirmedSupportType ?? '',
    truckNumber: item.truckNumber ?? '',
    date: item.date ?? '',
    pictureId: item.pictureId ?? ''
  }))
