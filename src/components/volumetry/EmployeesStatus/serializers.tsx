export const toTableRowItems = items =>
  items.map(item => ({
    fullName: item.fullName || '',
    hasInProgressTasks: item.hasInProgressTasks || false,
    taskName: item.taskName || 0,
    finishedTasksNumber: item.finishedTasksNumber || 0,
  }))
