import { EmployeeManagementItem } from 'components/volumetry/interfaces'

export const toTableRowItems = items =>
  items.map((item: EmployeeManagementItem) => ({
    id: item.id,
    fullName: item.fullName || '',
    jobTitle: item.jobTitle || '',
    genericDepartment: item.genericDepartment || '',
    location: item.location || ''
  }))
