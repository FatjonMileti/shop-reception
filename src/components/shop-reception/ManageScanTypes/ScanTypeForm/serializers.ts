export const toAdminDepositPayload = (payload) => ({
  id: payload.id,
  depositCode: payload.depositCode,
  name: payload.name,
  depositType: payload.depositType,
  validityPercentage: payload.validityPercentage,
  active: payload.active
})