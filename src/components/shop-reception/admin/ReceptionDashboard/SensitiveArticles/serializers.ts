export const toTableRowItems = (items: UnorderedProducts[]) =>
  items.map((item: UnorderedProducts) => ({
    id: item.id,
    depositName: item.depositName || '',
    shopName: item.shopName || '',
    shopCode: item.shopCode || '',
    productCode: item.productCode || '',
    productName: item.productName || '',
    productEan: item.productEan || '',
    validatedQuantity: item.validatedQuantity || '',
    brokenQuantity: item.brokenQuantity || '',
    defectReason: item.defectReason || '',
    externalSupportCode: item.externalSupportCode || '',
    deliveryTicketExternalId: item.deliveryTicketExternalId || '',
    created: item.created || '',
    createdBy: item.createdBy || '',
    resolved: item.resolved || false,
    updated: item.updated || '',
    lastUpdateBy: item.lastUpdateBy || ''
  }))
