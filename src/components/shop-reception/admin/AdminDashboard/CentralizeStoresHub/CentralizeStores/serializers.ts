export const toTableRowItems = (items: CentralizeStoresHub[]) =>
  items.map((item: CentralizeStoresHub) => ({
    id: item.destinationId,
    destinationHubId: item.destinationId || null,
    destinationName: item.destinationName || '',
    depositNames: item.depositNames || '',
    hubId: item.hubNames || ''
  }))
