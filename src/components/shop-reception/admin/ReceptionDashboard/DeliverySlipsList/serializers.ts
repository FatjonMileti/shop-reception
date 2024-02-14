export const toTableRowItems = (items: DeliverySlip[]) => items.map((item: DeliverySlip) => ({
  id: item.id,
  shopCode: item.shopCode,
  depositName: item.depositName,
  deliveryType: item.deliveryType,
  status: item.status,
  transportCode: item.transportCode,
  sealCode: item.sealCode,
  truckNumber: item.truckNumber,  
  numberOfSupports: item.numberOfSupports,
  validatedSupports: item.validatedSupports,
  created: item.created,
}))

