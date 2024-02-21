export const toTableRowItems = (items: SupportWrongDestination[]) =>
  items.map((item: SupportWrongDestination) => ({
    id: item.id,
    supportCode: item.supportCode,
    depositName: item.depositName,
    externalTicketId: item.externalTicketId,
    externalOrderId: item.externalOrderId,
    originalOrderId: item.originalOrderId,
    shopName: item.shopName,
    destinationShopName: item.destinationShopName,
    lastUpdateBy: item.lastUpdateBy,
    lastUpdate: item.lastUpdate,
    resolved: item.resolved,
    resolvingDate: item.resolvingDate,
    resolvedBy: item.resolvedBy,
    resolvingComment: item.resolvingComment,
    hasAttachment: item.hasAttachment,
    unload: item.unload
  }))
