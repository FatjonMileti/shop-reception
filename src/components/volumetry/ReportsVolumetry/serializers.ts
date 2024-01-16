export const toTableRowItems = items =>
  items.map(item => ({
    id: item.id,
    name: item.name || '',
    workVolume: item.standardProductivity || '',
    allocatedWorkers: item.priority || '',
    timeEstimation: item.id || '',
    standardAllocatedHours: item.recommendedTimeInterval || ''
  }))
