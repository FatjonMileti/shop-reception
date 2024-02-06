export const toTableRowItems = (items: DifferencesProduct[]) => items.map((item: DifferencesProduct) => ({
  id: item.id,
  deliverySlip: item.deliverySlip,
  store: item.store,
  warehouse: item.warehouse,
  productName: item.productName,
  homeOrder: item.homeOrder,
  metiOrder: item.metiOrder,
  unitOfMeasure: item.unitOfMeasure,
  expectedQuantity: item.expectedQuantity,
  qualitativeReceivedQuantity: item.qualitativeReceivedQuantity,
  defectiveReceivedQuantity: item.defectiveReceivedQuantity,
  grams: item.grams,
  inStockQuantity: item.inStockQuantity,
  difference: item.difference,
  raceCode: item.raceCode,
  sentToMeti: item.sentToMeti,
  integrationOperator: item.integrationOperator
}))