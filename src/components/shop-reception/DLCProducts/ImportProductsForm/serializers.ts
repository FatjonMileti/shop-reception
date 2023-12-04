export const toAdminDepositPayload = (item: SensitiveProduct) => ({
  id: item.id,
  storeType: item.storeType,
  storeCode: item.storeCode,
  storeName: item.storeName,
  district: item.district,
  family: item.family,
  subfamily: item.subfamily,
  UbCode: item.UbCode,
  productCode: item.productCode
})