import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    shopCodes: Yup.array().of(Yup.string()).required(),
    file: Yup.mixed().required()
  })

export const getInitialValues = () => {
  return {
    shopCodes: [],
    file: null
  }
}
