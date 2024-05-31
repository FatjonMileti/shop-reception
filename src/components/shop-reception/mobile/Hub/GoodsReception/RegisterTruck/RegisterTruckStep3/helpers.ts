import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    hubNumber: Yup.string().required('Aviz Hub este un câmp necesar'),
    sealNumber: Yup.string().required('Număr sigiliu este un câmp necesar')
  })

export const initialValues = {
  hubNumber: '',
  sealNumber: ''
}