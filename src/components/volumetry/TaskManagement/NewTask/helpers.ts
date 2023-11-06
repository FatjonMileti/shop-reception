import * as Yup from 'yup'

export const getInitialValues = editItem => ({
  ...(editItem?.id ? { id: editItem?.id } : {}),
  departmentName: editItem?.departmentName ?? '',
  taskName: editItem?.taskName ?? '',
  estimateStartTime: editItem?.estimateStartTime ?? '',
  estimateEndTime: editItem?.estimateEndTime ?? '',
  frequency: editItem?.frequency ?? '',
  prodStandardValue: editItem?.prodStandardValue ?? '',
  prodStandardUM: editItem?.prodStandardUM ?? '',
  workVolumeSource: editItem?.workVolumeSource ?? '',
  priority: editItem?.priority ?? '',
  status: editItem?.status ?? ''
})

export const getValidationSchema = (editItem) => Yup.object().shape({
  taskName: Yup.string().required(),
  estimateStartTime: Yup.string().required(),
  estimateEndTime: Yup.string().required(),
  department: Yup.object().shape({
    label: Yup.string().required('Department is required'),
    value: Yup.string().required('Department is required')
  }),
  frequency: Yup.object().shape({
    label: Yup.string().required('Frequency is required'),
    value: Yup.string().required('Frequency is required')
  }),
  prodStandardValue: Yup.string().required(),
  prodStandardUM: Yup.string().required(),
  workVolumeSource: Yup.object().shape({
    label: Yup.string().required('Source is required'),
    value: Yup.string().required('Source is required')
  }),
  priority: Yup.number().required(),
  status: Yup.boolean().required()
})
