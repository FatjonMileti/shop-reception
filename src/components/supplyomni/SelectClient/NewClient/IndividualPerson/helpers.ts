import * as Yup from 'yup'

export const initialValues = {
  name: '',
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
  }
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Numele este obligatoriu.'),
  phone: Yup.string()
    .required('Numarul de telefon este obligatoriu.')
    .min(10, 'Trebuie sa aiba exact 10 cifre')
    .max(10, 'Trebuie sa aiba exact 10 cifre'),
  email: Yup.string().email('Trebuie sa fie o adresa de email valida.'),
  address: Yup.string().required('Adresa este obligatorie.'),
  county: Yup.object().shape({
    id: Yup.string().required('Judetul este obligatoriu.'),
    name: Yup.string().required()
  }),
  city: Yup.object().shape({
    id: Yup.string().required('Orasul este obligatoriu.'),
    name: Yup.string().required()
  })
})
