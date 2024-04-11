export const toTableRowItems = (items: DifferencesProduct[]) =>
  items.map((item: DifferencesProduct) => ({
    id: item.id,
    externalTicketId: item.externalTicketId || '',
    shopName: item.shopName || '',
    shopCode: item.shopCode || '',
    depositName: item.depositName || '',
    productCode: item.productCode || '',
    productName: item.productName || '',
    originalOrderId: item.originalOrderId || '',
    metiOrderId: item.metiOrderId || '',
    measureUnit: item.measureUnit || '',
    transportCode: item.transportCode || '',
    orderedQuantity: item.orderedQuantity || '',
    receivedQuantity: item.receivedQuantity || '',
    brokenQuantity: item.brokenQuantity || '',
    receptionDeviation: item.receptionDeviation || '',
    stockQuantity: item.stockQuantity || '',
    missingQuantity: item.missingQuantity || '',
    transporterCode: item.transporterCode || '',
    metiSentDate: item.metiSentDate || '',
    integrationOperator: item.integrationOperator || '',
    archivePath: item.archivePath
  }))
