export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    supportStatus: item.supportStatus || '',
    shopName: item.shopName || '',
    hubName: item.hubName || '',
    externalCode: item.externalCode || '',
    heterogeneousCode: item.heterogeneousCode || '',
    createdBy: item.createdBy || '',
    created: item.created || '',
    updatedBy: item.updatedBy || '',
    updated: item.updated || ''
  }))
