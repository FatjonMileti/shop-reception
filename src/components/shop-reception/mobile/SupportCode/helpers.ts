import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string().required('Cod Suport este un câmp obligatoriu'),
    supportTypeId: Yup.string(),
    reason: Yup.array().of(Yup.string())
  })

export const initialValues = {
  supportCode: '',
  supportTypeId: '',
  reason: []
}
