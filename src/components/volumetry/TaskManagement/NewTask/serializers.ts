export const toTaskPayload = values => {
  return {
    departments: values.departments.map(department => department.value),
    estimateEndTime: values.estimateEndTime,
    estimateStartTime: values.estimateStartTime,
    frequency: values.frequency.value,
    priority: values.priority,
    prodStandardUM: values.prodStandardUM.value,
    prodStandardValue: values.prodStandardValue,
    status: values.status,
    workVolumeSource: values.workVolumeSource.value
  }
}