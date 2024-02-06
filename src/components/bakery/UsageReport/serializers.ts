export const toTableRowItems = items => items.map(item => ({
    id: item.id || '',
    storeName: item.storeName || '',
    username: item.username || '',
    lastAccess: item.lastAccess || '',
    lastChange: item.lastChange || '',
    applicationReportDynamicDtos: item.applicationReportDynamicDtos || []
  }))