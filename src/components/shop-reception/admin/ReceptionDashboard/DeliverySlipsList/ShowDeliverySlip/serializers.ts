export const toTableRowItems = (items: any[]) => items.map((item: any) => ({
  id: item.id,
  store: item.store,
  warehouseName: item.warehouseName,
  deliverySlip: item.deliverySlip,
  status: item.status,
  seal: item.seal,
  raceCode: item.raceCode,
  registrationNumber: item.registrationNumber,
  expectedSupports: item.expectedSupports,
  destinationReachedSupports: item.destinationReachedSupports,
  registrationDate: item.registrationDate,
}))