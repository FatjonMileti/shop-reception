export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    shopName: item.shopName ?? '',
    hubName: item.hubName ?? '',
    parentSociety: item.parentSociety ?? '',
    supportType: item.supportType ?? '',
    stock: item.stock ?? '',
    createdDate: item.createdDate ?? ''
  }))
