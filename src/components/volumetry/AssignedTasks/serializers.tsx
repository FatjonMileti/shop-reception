import TaskDescription from '../TaskAllocations/TaskDescription'
import TaskSummary from '../TaskAllocations/TaskSummary'

export const toListTableRows = (
  items,
  shouldRefreshData,
  setShouldRefreshData,
  setSelectedRowId
) => {
  const groupedItems = items.reduce((acc, item) => {
    const alreadyExistingItemIndex = acc.findIndex(i => i.id === item.taskTemplateId)
    if (~alreadyExistingItemIndex) {
      acc[alreadyExistingItemIndex] = {
        ...acc[alreadyExistingItemIndex],
        employees: [...acc[alreadyExistingItemIndex].employees, toItemEmployee(item)]
      }
    } else {
      acc.push(toAssignedTasksItem(item))
    }
    return acc
  }, [])

  return groupedItems.map(item => ({
    id: item.taskTemplateId,
    summary: <TaskSummary item={item} hideDetails />,
    details: (
      <TaskDescription
        item={item}
        employees={item.employees}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        setSelectedRowId={setSelectedRowId}
        hideDetails
      />
    ),
    borderLeftColor: '#0970E6',
    defaultExpanded: true
  }))
}

export const toAssignedTasksItem = item => ({
  id: item.taskTemplateId,
  departmentAlias: item.departmentAlias,
  taskName: item.taskName,
  recommendedInterval: item.recommendedInterval,
  priorityId: item.priorityId,
  priorityValue: item.priorityValue,
  frequency: item.frequency,
  employees: [toItemEmployee(item)],
  minDivision: item.minDivision
})

export const toItemEmployee = item => ({
  id: item.taskContributionId,
  workload: item.workload,
  timerStatus: item.timerStatus,
  progressProportion: item.progressPercentage,
  comment: item.comment,
  createdAt: item.createdAt,
  timeInterval: item.taskContributionInterval,
  allocatedWorkload: item.allocatedWorkload,
  performedWorkload: item.performedWorkload
})
