export const toTableRowItems = (items: SupportWrongDestination[]) => items.map((item: SupportWrongDestination) => ({
  id: item.id,
  supportCode: item.supportCode,
  warehouseName: item.warehouseName,
  deliverySlip: item.deliverySlip,
  orderedDelivered: item.orderedDelivered,
  orderedIssued: item.orderedIssued,
  desiredDestination: item.desiredDestination,
  realDestination: item.realDestination,
  operator: item.operator,
  scanDate: item.scanDate,
  resolved: item.resolved,
  resolvedDate: item.resolvedDate,
  resolveOperator: item.resolveOperator,
  comment: item.comment,
  unload: item.unload
}))