export const toTableRowItems = (items: SupportWrongDestination[]) =>
  items.map((item: SupportWrongDestination) => ({
    id: item.id,
    canResolve: item.canResolve || false,
    depositName: item.depositName || '',
    destinationShopName: item.destinationShopName || '',
    externalOrderId: item.externalOrderId || '',
    externalTicketId: item.externalTicketId || '',
    hasAttachment: item.hasAttachment || false,
    lastUpdateBy: item.lastUpdateBy || '',
    lastUpdate: item.lastUpdate || null,
    originalOrderId: item.originalOrderId || '',
    resolved: item.resolved || false,
    resolvingDate: item.resolvingDate || '',
    resolvedBy: item.resolvedBy || '',
    resolvingComment: item.resolvingComment || '',
    shopName: item.shopName || '',
    supportCode: item.supportCode || '',
    supportId: item.supportId || '',
    wrongDestinationResultId: item.wrongDestinationResultId || ''
  }))
