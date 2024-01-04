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
    frequency: item?.frequency ?? null,
    standardProductivityValue: item?.standardProductivityValue ?? '',
    measurementUnit: item?.measurementUnit ?? null,
    workVolumeSource: item?.workVolumeSource ?? null,
    priority: item?.priority ?? null,
    isActive: item?.isActive ?? true
  }
}

// TODO: add validation messages
export const getValidationSchema = item =>
  Yup.object().shape({
    name: Yup.string().required('Acest camp este obligatoriu.'),
    rayonsOrDepartment: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    volumetryLocationCategory: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    raion: Yup.array()
      .of(
        Yup.object({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
      .required('Acest camp este obligatoriu.'),
    recommendedStartHour: Yup.date().required('Acest camp este obligatoriu.'),
    recommendedEndHour: Yup.date().required('Acest camp este obligatoriu.'),
    frequency: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    standardProductivityValue: Yup.string().required('Acest camp este obligatoriu.'),
    measurementUnit: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    workVolumeSource: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),

    priority: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    status: Yup.boolean()
  })
