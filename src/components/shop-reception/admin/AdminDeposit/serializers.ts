export const toTableRowItems = (items: AdminDeposit[]) => items.map((item: AdminDeposit) => ({
  id: item.id,
  depositCode: item.depositCode,
  name: item.name,
  depositType: item.depositType,
  address: item.address,
  validityPercentage: item.validityPercentage,
  emails: item.emails,
  active: item.active
}))