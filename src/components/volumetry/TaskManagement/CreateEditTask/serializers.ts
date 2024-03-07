import { TaskManagementItem } from 'components/volumetry/interfaces'
import dayjs from 'dayjs'

export const toTaskPayload = (values: TaskManagementItem) => ({
  name: values.name,
  departmentAliasId: values.departmentAlias.value,
  recommendedStartHour: dayjs(values.recommendedStartHour).format('HH:mm'),
  recommendedEndHour: dayjs(values.recommendedEndHour).format('HH:mm'),
  frequency: [values.frequency.value],
  locationCategoryId: values.volumetryLocationCategory.value,
  standardProductivity: +values.standardProductivityValue,
  workVolumeSourceId: values.workVolumeSource.value,
  measurementUnitId: values.measurementUnit.value,
  priorityId: +values.priority.value
})
