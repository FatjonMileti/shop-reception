export const toTableRowItems = items =>
  items.map(item => ({
    fullName: item.fullName || '',
    currentStatus: item.currentStatus || '',
    todoTasks: item.todoTasks || 0,
    inProgressTasks: item.inProgressTasks || 0,
    doneTasks: item.doneTasks || 0
  }))
