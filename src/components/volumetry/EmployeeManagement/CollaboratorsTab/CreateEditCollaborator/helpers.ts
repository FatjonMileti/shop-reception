import * as yup from 'yup'

export const getValidationSchema = () =>
  yup.object({
    firstName: yup.string().nonNullable().required('Acest camp este obligatoriu.'),
    lastName: yup.string().nonNullable().required('Acest camp este obligatoriu.'),
    middleName: yup.string().optional(),
    email: yup.string().optional(),
    genericDepartment: yup
      .object()
      .shape({
        label: yup.string().required('Acest camp este obligatoriu.'),
        value: yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),

    workerType: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    employer: yup.string().nonNullable().required('Acest camp este obligatoriu.')
  })

export const getInitialValues = editItem => {
  return {
    firstName: editItem?.firstName || '',
    lastName: editItem?.lastName || '',
    middleName: editItem?.middleName || '',
    email: editItem?.email || '',
    genericDepartment: editItem?.genericDepartment
      ? { label: editItem.genericDepartment, value: editItem.genericDepartment }
      : null,
    workerType: editItem?.workerType
      ? { label: editItem.workerType, value: editItem.workerTypeId }
      : null,
    employer: editItem?.employer || ''
  }
}
