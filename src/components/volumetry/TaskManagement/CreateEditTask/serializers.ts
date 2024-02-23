import { TaskManagementItem } from 'components/volumetry/interfaces'
import dayjs from 'dayjs'

export const toTaskPayload = (values: TaskManagementItem) => ({
  name: values.name,
  estimatedStartHour: dayjs(values.recommendedStartHour).format('HH:mm'),
  estimatedEndHour: dayjs(values.recommendedEndHour).format('HH:mm'),
  frequency: [values.frequency.value],
  ...(!!values.rayons.length && { genericRayons: values.rayons.map(rayon => rayon.value) }),
  locationCategoryId: values.volumetryLocationCategory.value,
  defaultWorkload: values.defaultWorkload,
  standardProductivityValue: +values.standardProductivityValue,
  workVolumeSourceId: values.workVolumeSource.value,
  measurementUnitId: values.measurementUnit.value,
  priorityId: +values.priority.value,
  isActive: values.isActive,
  ...(!values.rayons.length && { rayonsOrDepartment: values.rayonsOrDepartment.value })
})
