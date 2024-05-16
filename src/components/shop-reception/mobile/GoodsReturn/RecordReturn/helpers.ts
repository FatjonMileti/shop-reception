import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    id: Yup.string().required('Câmpul destinație este obligatoriu'),
    truckNumber: Yup.string().required('Numărul de înmatriculare este un câmp necesar'),
    driverName: Yup.string().required('Câmpul șoferului este obligatoriu'),
    packageReturn: Yup.boolean()
  })

export const initialValues = {
  id: '',
  truckNumber: '',
  driverName: '',
  packageReturn: false
}