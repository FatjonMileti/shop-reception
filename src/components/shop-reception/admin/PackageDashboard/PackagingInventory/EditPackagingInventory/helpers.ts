import * as yup from 'yup'

export const validationSchema = yup.object({
  intact: yup.number().nonNullable().required('Acest camp este obligatoriu.'),
  defect: yup.number().nonNullable().required('Acest camp este obligatoriu.')
})
