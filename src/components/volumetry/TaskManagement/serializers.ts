export const toTableItems = items => items.map(item => ({
  id: item.id,
  department: item.department.name,
  taskName: item.taskName,
  estimateStartTime: item.estimateStartTime,
  estimateEndTime: item.estimateEndTime,
  frequency: item.frequency.name,
  prodStandardValue: item.prodStandardValue,
  prodStandardUM: item.prodStandardUM.name,
  workVolumeSource: item.workVolumeSource.name,
  priority: item.priority,
  status: item.status
}))