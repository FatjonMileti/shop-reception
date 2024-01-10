export const toTableRowItems = (items: MetiProduct[]) => items.map((item: MetiProduct) => ({
  id: item.id,
  productCode: item.productCode,
  productName: item.productName,
  measurementUnit: item.measurementUnit,
  validDays: item.validDays,
  district: item.district,
  family: item.family,
  subfamily: item.subfamily,
  subfamilyValidityThreshold: item.subfamilyValidityThreshold
}))