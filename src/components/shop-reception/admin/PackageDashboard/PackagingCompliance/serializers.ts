export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    depositName: item.depositName ?? '',
    deliveryTicketId: item.deliveryTicketId ?? '',
    supportTypeName: item.supportType ?? '',
    supportTypeCode: item.supportCode ?? '',
    nonCompliantReason: item.nonCompliantReason ?? '',
    created: item.created ?? '',
    pictureId: item.pictureId ?? ''
  }))
