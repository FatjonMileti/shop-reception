import { Department } from './interfaces'

export const toDepartmentsOptions = (departments: Department[]) =>
  departments.map(department => ({ label: department.departmentName, value: department.id }))
