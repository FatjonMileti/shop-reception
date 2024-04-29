export const toTableRowItems = (items: CentralizeStoresHub[]) =>
  items.map((item: CentralizeStoresHub) => ({
    id: item.destinationId,
    destinationId: item.destinationId || null,
    destinationName: item.destinationName || '',
    depositNames: item.depositNames || '',
    hubNames: item.hubNames || ''
  }))
