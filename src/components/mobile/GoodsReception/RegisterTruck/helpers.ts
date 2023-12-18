import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    registrationNumber: Yup.string().required('Număr înmatriculare este un câmp obligatoriu')
  })

export const initialValues = {
  registrationNumber: ''
}