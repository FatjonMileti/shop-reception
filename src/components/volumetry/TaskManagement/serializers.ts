import { TaskManagementItem } from '../interfaces'

export const toTableItems = items =>
  items.map((item: TaskManagementItem) => ({
    id: item.id,
    rayonsOrDepartment: item.rayonsOrDepartment,
    name: item.name,
    recommendedStartHour: item.recommendedStartHour,
    recommendedEndHour: item.recommendedEndHour,
    frequency: item.frequency,
    standardProductivityValue: item.standardProductivityValue,
    measurementUnit: item.measurementUnit,
    workVolumeSource: item.workVolumeSource,
    priority: item.priority,
    isActive: item.isActive,
    volumetryLocationCategory: item.volumetryLocationCategory
  }))
