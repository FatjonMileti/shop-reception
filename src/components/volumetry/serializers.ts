import { Department, Region } from './interfaces'

export const toDepartmentsOptions = (departments: Department[]) =>
  departments.map(department => ({ label: department.departmentName, value: department.id }))

export const toRegionsOptions = (regions: Region[]) =>
  regions.map(region => ({ label: region.name, value: region.id }))
