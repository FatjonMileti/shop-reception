import * as yup from 'yup'

export const getValidationSchema = () =>
  yup.object({
    fullName: yup.string().nonNullable().required('Acest camp este obligatoriu.'),
    genericDepartment: yup
      .object()
      .shape({
        label: yup.string().required('Acest camp este obligatoriu.'),
        value: yup.string().required()
      })
      .required('Acest camp este obligatoriu.'),
    jobTitle: yup
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
    fullName: editItem?.fullName || '',
    genericDepartment: editItem?.genericDepartment
      ? { label: editItem.genericDepartment, value: editItem.genericDepartment }
      : null,
    jobTitle: editItem?.jobTitle ? { label: editItem.jobTitle, value: editItem.jobTitle } : null,
    employer: editItem?.employer || ''
  }
}
