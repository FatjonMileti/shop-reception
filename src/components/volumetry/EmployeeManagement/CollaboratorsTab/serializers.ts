export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    fullName: item.fullName || '',
    jobTitle: item.jobTitle || '',
    department: item.department || '',
    location: item.location || '',
    employer: item.employer || ''
  }))
