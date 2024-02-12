export const toDepositTypesOptions = types =>
  types.map(type => ({
    value: type.id,
    label: type.name
  }))
