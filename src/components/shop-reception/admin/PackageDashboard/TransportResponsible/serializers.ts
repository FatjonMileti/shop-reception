export const toTableRowItems = (items: TransportResponsible[]) => items.map((item: TransportResponsible) => ({
  id: item.id,
  firstName: item.firstName,
  name: item.name,
  emails: item.emails,
}))