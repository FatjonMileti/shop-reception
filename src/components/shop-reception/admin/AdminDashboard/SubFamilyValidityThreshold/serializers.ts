export const toTableRowItems = (items: SubFamilyValidityThreshold[]) => items.map((item: SubFamilyValidityThreshold) => ({
  id: item.id,
  subfamilyCode: item.subfamilyCode,
  familyCode: item.familyCode,
  subfamily: item.subfamily,
  family: item.family,
  districtCode: item.districtCode,
  district: item.district,
  validityThreshold: item.validityThreshold
}))