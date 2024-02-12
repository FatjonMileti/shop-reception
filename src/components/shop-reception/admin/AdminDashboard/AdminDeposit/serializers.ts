export const toTableRowItems = (items) => items.map((item) => ({
  id: item.id,
  code: item.code ?? '',
  name: item.name ?? '',
  type: item.type ?? '',
  address: item.address,
  validityPercentage: item.validityPercentage ?? '',
  emails: item.emails ?? '',
  active: item.active,
  depositUsers: item.depositUsers ?? ''
}))