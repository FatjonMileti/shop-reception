import * as Yup from 'yup'

export const initialValues = {
  name: '',
  cif: '',
  companyRegistrationNumber: '',
  phone: '',
  email: '',
  address: '',
  city: {
    id: '',
    name: ''
  },
  county: {
    id: '',
    name: ''
  },
  isTaxPayer: false
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Numele este obligatoriu.'),
  cif: Yup.string().required('CIF este obligatoriu.'),
  companyRegistrationNumber: Yup.string().required('Numarul din Registrul Comertului este obligatoriu.'),
  phone: Yup.string()
    .required('Numarul de telefon este obligatoriu.')
    .min(10, 'Trebuie sa aiba exact 10 cifre')
    .max(10, 'Trebuie sa aiba exact 10 cifre'),
  email: Yup.string().email('Trebuie sa fie o adresa de email valida.'),
  address: Yup.string().required('Adresa este obligatorie.'),
  county: Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required()
  }),
  city: Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required()
  }),
  isTaxPayer: Yup.boolean()
})
