import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    store: Yup.string().required(),
    file: Yup.mixed().required()
  })

export const getInitialValues = () => {
  return {
    store: null,
    file: null
  }
}
