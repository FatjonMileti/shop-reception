import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string().required()
  })

export const initialValues = {
  supportCode: ''
}