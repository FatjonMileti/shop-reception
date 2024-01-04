import * as yup from 'yup'

export const getValidationSchema = () =>
  yup.object({
    fullName: yup.string().nonNullable(),
    department: yup.string().nonNullable(),
    jobTitle: yup.string().nonNullable(),
    employer: yup.string().nonNullable()
  })

export const getInitialValues = editItem => {
  return {
    fullName: editItem?.fullName || '',
    department: editItem?.department || '',
    jobTitle: editItem?.jobTitle || '',
    employer: editItem?.employer || ''
  }
}
