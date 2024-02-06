export const toTableRowItems = items =>
  items.map(item => ({
    storeName: item.storeName || '',
    username: item.username || '',
    lastAccess: item.lastAccess || '',
    lastChange: item.lastChange || '',
    applicationReportDynamicDtos: item.applicationReportDynamicDtos || []
  }))
