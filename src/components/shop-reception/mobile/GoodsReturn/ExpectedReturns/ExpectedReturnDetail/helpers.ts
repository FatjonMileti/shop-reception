import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    sealNumber: Yup.string().required('Număr sigiliu este un câmp necesar'),
    opinion: Yup.string().required('Aviz este un câmp necesar')
  })

export const initialValues = {
  sealNumber: '',
  opinion: ''
}