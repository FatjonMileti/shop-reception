export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id || '',
    assignedRoles: item.assignedRoles || '',
    baseRole: item.baseRole || '',
    numberOfProjects: item.numberOfProjects ?? '',
    remaining: item.remaining ?? '',
    teamMemberName: item.teamMemberName || '',
    totalAvailable: item.totalAvailable ?? '',
    totalEffort: item.totalEffort ?? ''
  }))
