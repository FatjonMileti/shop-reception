export const toPayload = (item) => ({
  id: item.id,
  familyCode: item.familyCode,
  subfamily: item.subfamily,
  family: item.family,
  district: item.district,
  validityThreshold: item.validityThreshold
})