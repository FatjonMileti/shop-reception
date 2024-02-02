import TaskDescription from '../TaskAllocations/TaskDescription'
import TaskSummary from '../TaskAllocations/TaskSummary'

export const toListTableRows = (
  items,
  employees,
  shouldRefreshData,
  setShouldRefreshData,
  setSelectedRowId
) => {
  return items.map(item => ({
    id: item.taskTemplateId,
    summary: <TaskSummary item={item} />,
    details: (
      <TaskDescription
        item={item}
        employees={employees}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        setSelectedRowId={setSelectedRowId}
      />
    ),
    borderLeftColor: '#0970E6',
    defaultExpanded: true
  }))
}
