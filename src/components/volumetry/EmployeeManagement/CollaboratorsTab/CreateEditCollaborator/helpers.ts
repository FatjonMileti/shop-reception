import * as yup from 'yup'

export const getValidationSchema = () =>
  yup.object({
    id: yup.number().nonNullable(),
    fullName: yup.string().nonNullable(),
    department: yup.string().nonNullable(),
    jobTitle: yup.string().nonNullable(),
    employer: yup.string().nonNullable()
  })

export const getInitialValues = editItem => {
  return {
    id: editItem?.id || 0,
    fullName: editItem?.fullName || '',
    department: editItem?.department || '',
    jobTitle: editItem?.jobTitle || '',
    employer: editItem?.employer || ''
  }
}
