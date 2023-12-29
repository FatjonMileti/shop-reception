import dayjs from 'dayjs'

export const toTaskPayload = values => {
  return {
    taskName: values.taskName,
    department: values.department.value,
    category: values.category.value,
    raion: values.raion.map(item => item.value),
    estimateEndTime: dayjs(values.estimateEndTime).format('HH:mm'),
    estimateStartTime: dayjs(values.estimateStartTime).format('HH:mm'),
    frequency: values.frequency.value,
    priority: values.priority.value,
    prodStandardUM: values.prodStandardUM.value,
    prodStandardValue: values.prodStandardValue,
    status: values.status,
    workVolumeSource: values.workVolumeSource.value
  }
}

export const fromTaskPayload = result => ({
  ...result,
  estimateStartTime: dayjs(result.estimateStartTime, 'HH:mm'),
  estimateEndTime: dayjs(result.estimateEndTime, 'HH:mm')
})
