import * as yup from 'yup'

export const validationSchema = yup.object({
  stock: yup.string().nonNullable().required('Acest camp este obligatoriu.')
})
