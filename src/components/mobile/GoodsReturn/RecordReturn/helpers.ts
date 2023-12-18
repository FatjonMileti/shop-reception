import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    destination: Yup.string().required('Câmpul destinație este obligatoriu'),
    registrationNumber: Yup.string().required('Numărul de înmatriculare este un câmp necesar'),
    driver: Yup.string().required('Câmpul șoferului este obligatoriu'),
    isPackingReturn: Yup.boolean()
  })

export const initialValues = {
  destination: '',
  registrationNumber: '',
  driver: '',
  isPackingReturn: false
}