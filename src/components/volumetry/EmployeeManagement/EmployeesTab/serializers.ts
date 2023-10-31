export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    departmentName: item.department.name,
    name: item.name,
    position: item.position.name
  }))
