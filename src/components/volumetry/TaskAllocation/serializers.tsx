export const toDepartmentOptions = data => data.map(item => ({ label: item.name, value: item.id }))

export const toListTableRows = items =>
  items.map(item => ({
    id: item.id,
    summary: <div>summary</div>,
    details: <div>description</div>,
    borderLeftColor: 'red'
  }))
