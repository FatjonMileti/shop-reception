import * as yup from 'yup'

export const getValidationSchema = () =>
  yup.object({
    firstName: yup.string().nonNullable().required('Acest camp este obligatoriu.'),
    lastName: yup.string().nonNullable().required('Acest camp este obligatoriu.'),
    email: yup
      .string()
      .email('Adresa de email nu este valida.')
      .nonNullable()
      .required('Acest camp este obligatoriu.')
  })

export const getInitialValues = editItem => {
  return {
    firstName: editItem?.firstName || '',
    lastName: editItem?.lastName || '',
    email: editItem?.email || ''
  }
}
