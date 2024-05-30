import { Department, Region, DepartmentAlias } from './interfaces'

export const toDepartmentsOptions = (departments: Department[]) =>
  departments.map(department => ({ label: department.departmentName, value: department.id }))

export const toDepartmentAliasesOptions = (
  departments: DepartmentAlias[],
  showGenericDepartmentId
) =>
  departments.map(department => ({
    label: department.alias,
    value: department.id,
    ...(showGenericDepartmentId && { genericDepartmentId: department.genericDepartmentId })
  }))

export const toRegionsOptions = (regions: Region[]) =>
  regions.map(region => ({ label: region.name, value: region.id }))
