import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string().required('Cod Suport este un câmp obligatoriu')
  })

export const initialValues = {
  supportCode: ''
}