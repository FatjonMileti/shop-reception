export const toTableRowItems = (items: PackagingDispute[]) => items.map((item: PackagingDispute) => ({
  id: item.id,
  warehouse: item.warehouse,
  storeType: item.storeType,
  store: item.store,
  via: item.via,
  society: item.society,
  shopTaskDate: item.shopTaskDate,
  storeTaskSolutionDate: item.storeTaskSolutionDate,
  notificationsSent: item.notificationsSent,
  shopNoticeNumber: item.shopNoticeNumber,
  shopNoticeDate: item.shopNoticeDate,
  status: item.status
}))