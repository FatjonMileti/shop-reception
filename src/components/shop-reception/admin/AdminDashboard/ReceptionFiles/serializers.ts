export const toTableRowItems = (items: ReceptionFile[]) =>
  items.map((item: ReceptionFile) => ({
    id: item.id,
    externalTicketId: item.externalTicketId,
    depositName: item.depositName,
    shopNames: item.shopNames,
    createdDate: item.createdDate,
    success: item.success,
    reason: item.reason,
    reimportAllowed: item.reimportAllowed
  }))
