import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    productCode: Yup.string().required('Cod Produse este un câmp obligatoriu')
  })

export const initialValues = {
  productCode: ''
}