export const toTableRowItems = (items: UnorderedProducts[]) => items.map((item: UnorderedProducts) => ({
  id: item.id,
  warehouse: item.warehouse,
  store: item.store,
  productCode: item.productCode,
  productName: item.productName,
  productEan: item.productEan,
  qualitativeQuantity: item.qualitativeQuantity,
  defectiveQuantity: item.defectiveQuantity,
  failureReason: item.failureReason,
  supportCode: item.supportCode,
  deliverySlip: item.deliverySlip,
  receptionDate: item.receptionDate,
  receptionOperator: item.receptionOperator,
  resolved: item.resolved,
  resolvedDate: item.resolvedDate,
  resolvedOperator: item.resolvedOperator
}))