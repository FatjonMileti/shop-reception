export const toTableRowItems = (items: any[]) =>
  items.map((item: any) => ({
    createdBy: item.createdBy || '',
    createdDate: item.createdDate || '',
    forShop: item.forShop || '',
    hubName: item.hubName || '',
    id: item.id || '',
    noticeCode: item.noticeCode || '',
    parentSociety: item.parentSociety || '',
    shopCode: item.shopCode || '',
    shopName: item.shopName || '',
    stock: item.stock || '',
    supportType: item.supportType || ''
  }))
