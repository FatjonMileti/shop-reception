import * as Yup from 'yup'

const getFrequencyValue = frequency => frequency.map(f => ({ label: f.value, value: f.key }))

export const getInitialValues = (item, categoryFilterValue) => {
  return {
    ...(item?.id ? { id: item?.id } : {}),
    name: item?.name ?? '',
    departmentAlias: item
      ? {
          label: item.departmentAliasValue,
          value: item.departmentAliasId
        }
      : null,
    volumetryLocationCategory: item
      ? { label: item.locationCategoryValue, value: item.locationCategoryId }
      : categoryFilterValue,
    recommendedStartHour: item?.recommendedStartHour ?? null,
    recommendedEndHour: item?.recommendedEndHour ?? null,
    frequency: item?.frequency ? getFrequencyValue(item.frequency) : [],
    // defaultWorkload: item?.defaultWorkload ?? '',
    standardProductivityValue: item?.standardProductivity ?? '',
    measurementUnit: item
      ? { label: item.measurementUnitValue, value: item.measurementUnitId }
      : null,
    workVolumeSource: item
      ? { label: item.workVolumeSourceValue, value: item.workVolumeSourceId }
      : null,
    priority: item ? { label: item.priorityValue, value: item.priorityId } : null
  }
}

const frequencySchema = Yup.object().shape({
  label: Yup.string().required(),
  value: Yup.string().required()
})

export const getValidationSchema = item =>
  Yup.object().shape({
    name: Yup.string().required('Acest camp este obligatoriu.'),
    departmentAlias: Yup.object()
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
    recommendedStartHour: Yup.date().required('Acest camp este obligatoriu.'),
    recommendedEndHour: Yup.date().when('recommendedStartHour', ([recommendedStartHour], yup) =>
      recommendedStartHour
        ? yup.min(
            recommendedStartHour,
            'Ora recomandata de sfarsit trebuie sa fie mai mare decat ora recomandata de inceput.'
          )
        : yup.required('Acest camp este obligatoriu.')
    ),
    frequency: Yup.array().of(frequencySchema).min(1, 'Acest camp este obligatoriu.'),
    // defaultWorkload: Yup.string().required('Acest camp este obligatoriu.'),
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
      .required('Acest camp este obligatoriu.')
  })
