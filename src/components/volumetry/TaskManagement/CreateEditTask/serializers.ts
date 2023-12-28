import { TaskManagementItem } from 'components/volumetry/interfaces'
import dayjs from 'dayjs'

export const toTaskPayload = (values: TaskManagementItem) => ({
  id: values.id,
  name: values.name,
  volumetryLocationCategory: values.volumetryLocationCategory,
  rayonsOrDepartment: values.rayonsOrDepartment,
  raion: values.raion,
  recommendedStartHour: dayjs(values.recommendedStartHour).format('HH:mm'),
  recommendedEndHour: dayjs(values.recommendedEndHour).format('HH:mm'),
  frequency: values.frequency,
  standardProductivityValue: values.standardProductivityValue,
  measurementUnit: values.measurementUnit,
  workVolumeSource: values.workVolumeSource,
  priority: values.priority,
  isActive: values.isActive,
})

export const fromTaskPayload = result => ({
  ...result,
  recommendedStartHour: dayjs(result.recommendedStartHour, 'HH:mm'),
  recommendedEndHour: dayjs(result.recommendedEndHour, 'HH:mm')
})
