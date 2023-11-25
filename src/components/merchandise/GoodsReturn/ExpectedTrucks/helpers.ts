import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    truck: Yup.string().required('Camion este un câmp obligatoriu')
  })

export const initialValues = {
  truck: ''
}