export const toDepartmentOptions = data => data.map(item => ({ label: item.name, value: item.id }))

export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    department: item.department,
    dayNumber: item.dayNumber,
    totalDailyTasks: item.totalDailyTasks,
    totalExcutedTasks: item.totalExcutedTasks,
    appliedVolumetryProcessPercentage: item.appliedVolumetryProcessPercentage + "%",
    utilizedVsStandardHours: item.utilizedVsStandardHours,
    utilizedVsStandardFTE: item.utilizedVsStandardFTE
  }))
