export const toResponsibleOptions = options =>
  options.map(option => ({
    value: option.key,
    label: option.value
  }))
