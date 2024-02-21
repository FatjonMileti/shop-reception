export const toPayload = (item) => ({
  id: item.id,
  firstName: item.firstName,
  name: item.name,
  emails: item.emails,
})