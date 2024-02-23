export const toTableRowItems = items =>
  items.map(item => ({
    fullName: item.fullName ?? '',
    hasInProgressTasks: item.hasInProgressTasks ?? false,
    taskName: item.taskName ?? '',
    finishedTasksNumber: item.finishedTasksNumber ?? 0,
  }))
