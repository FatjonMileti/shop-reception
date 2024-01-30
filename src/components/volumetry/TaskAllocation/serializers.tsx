import { Employee } from './Employee'
import TaskDescription from './TaskDescription'
import TaskSummary from './TaskSummary'
import { getEmployeeGroupName } from './helpers'

export const toDepartmentOptions = data => data.map(item => ({ label: item.name, value: item.id }))

export const toListTableRows = (items, shouldRefreshData, setShouldRefreshData, setSelectedRowId) =>
  items.map(item => ({
    id: item.taskTemplateId,
    summary: <TaskSummary item={item} />,
    details: (
      <TaskDescription
        item={item}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
        setSelectedRowId={setSelectedRowId}
      />
    ),
    borderLeftColor: '#0970E6'
  }))

export const toEmployeeFilterItems = items =>
  items
    .map(item => ({
      label: `${item.fullName} (${item.genericDepartment})` || '',
      value: item.workerId || '',
      groupBy: getEmployeeGroupName(item.shiftCategory),
      shiftCategory: item.shiftCategory
    }))
    .sort((a, b) => b.shiftCategory.localeCompare(a.shiftCategory))

export const toEmployeesItems = (
  item,
  employees,
  setShouldRefreshData,
  setSelectedRowId,
  hideDetails
) =>
  employees.map(employee => ({
    id: employee.id,
    content: (
      <Employee
        employee={employee}
        task={item}
        setShouldRefreshData={setShouldRefreshData}
        setSelectedRowId={setSelectedRowId}
        hideDetails={hideDetails}
      />
    )
  }))
