export const toTableRowItems = (items: SupportTradability[]) => items.map((item: SupportTradability) => ({
  id: item.id,
  raceCode: item.raceCode,
  raceType: item.raceType,
  loadingPlace: item.loadingPlace,
  uploadDate: item.uploadDate,
  carNumber: item.carNumber,
  warehouseName: item.warehouseName,
  driverName: item.driverName,
  driverPhone: item.driverPhone,
  hubName: item.hubName,
  storeName: item.storeName,
  society: item.society,
  goodsCategory: item.goodsCategory,
  numberOfPallets: item.numberOfPallets
}))