import Employee from './Employee'
import TaskDescription from './TaskDescription'
import TaskSummary from './TaskSummary'
import { getEmployeeGroupName } from './helpers'

export const toDepartmentOptions = data => data.map(item => ({ label: item.name, value: item.id }))

export const toListTableRows = (items, shouldRefreshData, setShouldRefreshData) =>
  items.map(item => ({
    id: item.id,
    summary: <TaskSummary item={item} />,
    details: (
      <TaskDescription
        item={item}
        shouldRefreshData={shouldRefreshData}
        setShouldRefreshData={setShouldRefreshData}
      />
    ),
    borderLeftColor: '#0970E6'
  }))

export const toEmployeeFilterItems = items =>
  items.map(item => ({
    label: item.fullName || '',
    value: item.id || '',
    groupBy: getEmployeeGroupName(item.shiftCategory)
  }))

export const toEmployeesItems = (item, employees, setShouldRefreshData) =>
  employees.map(employee => ({
    id: employee.id,
    content: (
      <Employee employee={employee} task={item} setShouldRefreshData={setShouldRefreshData} />
    )
  }))
