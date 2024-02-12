export const toDepositTypesOptions = types =>
  Object.keys(types).map(key => ({
    value: key,
    label: types[key]
  }))
