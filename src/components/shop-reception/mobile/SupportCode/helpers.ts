import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    supportCode: Yup.string(),
    supportTypeId: Yup.string().required(),
    reason: Yup.array().of(Yup.string()).min(1)
  })

export const initialValues = {
  supportCode: '',
  supportTypeId: '',
  reason: []
}
