import * as Yup from 'yup'

export const getInitialValues = item => {
  return {
    ...(item?.id ? { id: item?.id } : {}),
    name: item?.name ?? '',
    rayonsOrDepartment: item?.rayonsOrDepartment ?? null,
    volumetryLocationCategory: item?.volumetryLocationCategory ?? null,
    raion: item?.raion ?? null,
    recommendedStartHour: item?.recommendedStartHour ?? null,
    recommendedEndHour: item?.recommendedEndHour ?? null,
    frequency: item?.frequency ?? '',
    standardProductivityValue: item?.standardProductivityValue ?? '',
    measurementUnit: item?.measurementUnit ?? '',
    workVolumeSource: item?.workVolumeSource ?? '',
    priority: item?.priority ?? null,
    isActive: item?.isActive ?? true
  }
}

// TODO: add validation messages
export const getValidationSchema = item =>
  Yup.object().shape({
    name: Yup.string().required(),
    rayonsOrDepartment: Yup.object().shape({
      label: Yup.string().required('Departament is required'),
      value: Yup.string().required('Departament is required')
    }),
    volumetryLocationCategory: Yup.object().shape({
      label: Yup.string().required('Category is required'),
      value: Yup.string().required('Category is required')
    }),
    raion: Yup.array().of(
      Yup.object({
        label: Yup.string().required('Category is required'),
        value: Yup.string().required('Category is required')
      })
    ),
    recommendedStartHour: Yup.date().required(),
    recommendedEndHour: Yup.date().required(),
    frequency: Yup.object().shape({
      label: Yup.string().required('Frequency is required'),
      value: Yup.string().required('Frequency is required')
    }),
    standardProductivityValue: Yup.string().required(),
    measurementUnit: Yup.object().shape({
      label: Yup.string().required('UM standard productivitate is required'),
      value: Yup.string().required('UM standard productivitate is required')
    }),
    workVolumeSource: Yup.object().shape({
      label: Yup.string().required('Source is required'),
      value: Yup.string().required('Source is required')
    }),

    priority: Yup.object().shape({
      label: Yup.string().required('Priority is required'),
      value: Yup.string().required('Priority is required')
    }),
    status: Yup.boolean()
  })
