export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    depositName: item.depositName || '',
    shopType: item.shopType || '',
    shopName: item.shopName || '',
    hubName: item.hubName || '',
    parentSociety: item.parentSociety || '',
    created: item.createdDate || '',
    shopFinaliseTime: item.shopFinaliseTime || '',
    sentNotifications: item.sentNotifications || '',
    noticeCode: item.noticeNumber || '',
    noticeCreated: item.noticeDate || '',
    status: item.taskStatus || '',
    depositFinaliseTime: item.depositFinaliseTime || ''
  }))
