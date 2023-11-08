import * as Yup from 'yup'

export const getInitialValues = editItem => ({
  ...(editItem?.id ? { id: editItem?.id } : {}),
  departments: editItem
    ? editItem?.departments.map(department => ({ value: department.id, label: department.name }))
    : [],
  taskName: editItem?.taskName ?? '',
  estimateStartTime: editItem?.estimateStartTime ?? '',
  estimateEndTime: editItem?.estimateEndTime ?? '',
  frequency: editItem ? { value: editItem.frequency.id, label: editItem.frequency.name } : null,
  prodStandardValue: editItem?.prodStandardValue ?? '',
  prodStandardUM: editItem
    ? { value: editItem.prodStandardUM.id, label: editItem.prodStandardUM.name }
    : null,
  workVolumeSource: editItem
    ? { value: editItem.workVolumeSource.id, label: editItem.workVolumeSource.name }
    : null,
  priority: editItem?.priority ?? '',
  status: editItem?.status ?? true
})

export const getValidationSchema = editItem =>
  Yup.object().shape({
    taskName: Yup.string().required(),
    estimateStartTime: Yup.date().required(),
    estimateEndTime: Yup.date().required(),
    departments: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required('Departament is required'),
        value: Yup.string().required('Departament is required')
      })
    ),
    frequency: Yup.object().shape({
      label: Yup.string().required('Frequency is required'),
      value: Yup.string().required('Frequency is required')
    }),
    prodStandardValue: Yup.string().required(),
    prodStandardUM: Yup.object().shape({
      label: Yup.string().required('UM standard productivitate is required'),
      value: Yup.string().required('UM standard productivitate is required')
    }),
    workVolumeSource: Yup.object().shape({
      label: Yup.string().required('Source is required'),
      value: Yup.string().required('Source is required')
    }),
    priority: Yup.number().required(),
    status: Yup.boolean()
  })
