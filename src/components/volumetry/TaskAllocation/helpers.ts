export const toEmployeeFilterItems = items =>
  items.map(item => ({
    label: item.name || '',
    value: item.id || ''
  }))

export const getCapsuleColor = (isTaskStarted, isTaskEnded, isOverdue) => {
  if (isOverdue) {
    return { label: 'rgba(211, 13, 31, 0.15)', value: '#D30D1F', progress: 'error' }
  }

  if (!isTaskStarted && !isTaskEnded) {
    return { label: 'rgba(69, 69, 69, 0.15)', value: '#454545' }
  }

  if (isTaskStarted && !isTaskEnded) {
    return { label: 'rgba(51, 105, 30, 0.15)', value: '#33691E', progress: 'success' }
  }

  return { label: '', value: '' }
}
