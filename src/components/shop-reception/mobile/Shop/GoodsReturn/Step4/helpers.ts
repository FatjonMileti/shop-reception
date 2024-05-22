import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    stackNumber: Yup.string().nullable().required(),
    sealList: Yup.array().of(Yup.string().required())
  })

export const initialValues = {
  stackNumber: null,
  sealList: ['']
}
