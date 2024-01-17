export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    taskTemplateName: item.taskTemplateName || '-',
    totalWorkload: item.totalWorkload || '-',
    estimatedWorkers: item.estimatedWorkers || '-',
    estimatedWorkHours: item.estimatedWorkHours || '-',
    actualWorkers: item.actualWorkers || '-',
    standardAllocatedHours: item.standardAllocatedHours || '-',
    fteStandard: item.fteStandard || '-',
    hoursUsed: item.hoursUsed || '-',
    fteUsed: item.fteUsed || '-',
    expectedActualDifference: item.expectedActualDifference || '-'
  }))
