import * as Yup from 'yup'

export const validationSchema = Yup.object({
  feedbackReason: Yup.object().shape({
    label: Yup.string().required('Acest camp este obligatoriu'),
    value: Yup.string().required('Acest camp este obligatoriu')
  }),
  comment: Yup.string(),
  // photo: Yup.mixed()
})
