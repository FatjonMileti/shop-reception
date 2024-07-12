import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    stackNumber: Yup.number().nullable().required('Numar stive este obligatoriu!'),
    sealList: Yup.array().of(Yup.string().required('Numar sigiliu este obligatoriu!'))
  })

export const initialValues = {
  stackNumber: null,
  sealList: ['']
}
