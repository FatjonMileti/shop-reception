import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  comment: Yup.string().required(),
  file: Yup.mixed().required()
})
