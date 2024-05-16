import * as yup from 'yup'

export const validationSchema = yup.object({
  timerValue: yup.number().nonNullable().required('Acest camp este obligatoriu.')
})
