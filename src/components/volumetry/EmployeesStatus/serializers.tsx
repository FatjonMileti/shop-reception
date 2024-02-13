export const toTableRowItems = items =>
  items.map(item => ({
    fullName: item.fullName || '',
    hasInProgressTasks: item.hasInProgressTasks || false,
    notStartedTasksNumber: item.notStartedTasksNumber || 0,
    finishedTasksNumber: item.finishedTasksNumber || 0,
  }))
