export const toAdminDepositPayload = (item) => ({
  id: item.id,
  regionCode: item.regionCode,
  name: item.name,
  regionManager: item.regionManager,
  active: item.active
})