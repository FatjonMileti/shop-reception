export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    fullName: item.fullName || '',
    jobTitle: item.jobTitle || '',
    genericDepartment: item.genericDepartment || '',
    location: item.location || '',
    employer: item.employer || ''
  }))
