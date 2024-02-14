export const toPayload = (values) => ({
  code: values.code,
  name: values.name,
  type: values.type.value,
  validityPercentage: values.validityPercentage,
  active: values.active,
  emails: values.emails.split(';'),
  address: values.address,
  depositUsers: values.depositUsers.map(user => user.value)
})