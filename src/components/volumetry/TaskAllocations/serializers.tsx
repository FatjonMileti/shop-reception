import { formatCustomDate, formatPayloadTimeDate } from 'utils/helpers'
import { Employee } from './Employee'
import TaskDescription from './TaskDescription'
import TaskSummary from './TaskSummary'
import {
  getEmployeeGroupName,
  getEmployeesGroupedByDepartment,
  getSortedEmployees
} from './helpers'
import { AllocatedEmployee } from '../interfaces'

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

export const toEmployeesAttendance = (items: AllocatedEmployee[], genericDepartmentId: number) => {
  const groupedItems = getEmployeesGroupedByDepartment(items)

  const result = getSortedEmployees(groupedItems, genericDepartmentId)

  return result.map(item => {
    return {
      ...item,
      shouldAllocate:
        item.shiftCategory === 'ON_SHIFT' && item.genericDepartmentId === genericDepartmentId,
      shiftStart: formatCustomDate(item.shiftStart),
      shiftEnd: formatCustomDate(item.shiftEnd)
    }
  })
}

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

export const toEmployeesAttendancePayload = employees =>
  employees
    .filter(employee => employee.shouldAllocate)
    .map(employee => ({
      workerId: employee.workerId,
      shiftStart: formatPayloadTimeDate(employee.shiftStart),
      shiftEnd: formatPayloadTimeDate(employee.shiftEnd)
    }))

export const toEmployeesAllocationPayload = (employees, departmentId) => ({
  departmentAliasId: departmentId,
  workerIdList: employees
    .filter(employee => employee.shouldAllocate)
    .map(employee => employee.workerId)
})
