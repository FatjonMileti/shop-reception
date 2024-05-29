export const toTableRowItems = (items: TransportResponsible[]) =>
  items.map((item: TransportResponsible) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email
  }))
