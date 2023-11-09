import dayjs from "dayjs"

export const toTaskPayload = values => {
  return {
    taskName: values.taskName,
    department: values.department.value,
    estimateEndTime: dayjs(values.estimateEndTime).format('HH:mm'),
    estimateStartTime: dayjs(values.estimateStartTime).format('HH:mm'),
    frequency: values.frequency.value,
    priority: values.priority,
    prodStandardUM: values.prodStandardUM.value,
    prodStandardValue: values.prodStandardValue,
    status: values.status,
    workVolumeSource: values.workVolumeSource.value
  }
}