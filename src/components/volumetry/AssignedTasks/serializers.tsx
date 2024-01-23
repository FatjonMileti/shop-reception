import TaskDescription from '../TaskAllocation/TaskDescription'
import TaskSummary from '../TaskAllocation/TaskSummary'

export const toListTableRows = (
  items,
  shouldRefreshData,
  setShouldRefreshData,
  setSelectedRowId,
  hideDetails
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
    summary: <TaskSummary item={item} hideDetails={hideDetails} />,
    details: (
      <TaskDescription
        item={item}
        employees={item.employees}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        setSelectedRowId={setSelectedRowId}
        hideDetails={hideDetails}
      />
    ),
    borderLeftColor: '#0970E6'
  }))
}

export const toAssignedTasksItem = item => ({
  id: item.taskTemplateId,
  rayonsOrDepartment: item.rayonsOrDepartment,
  taskName: item.taskName,
  recommendedInterval: item.recommendedInterval,
  priorityId: item.priorityId,
  priorityValue: item.priorityValue,
  frequency: item.frequency,
  employees: [toItemEmployee(item)]
})

export const toItemEmployee = item => ({
  id: item.taskContributionId,
  workload: item.workload,
  timerStatus: item.timerStatus,
  progressProportion: item.progressPercentage,
  comment: item.comment,
  createdAt: item.createdAt
})
