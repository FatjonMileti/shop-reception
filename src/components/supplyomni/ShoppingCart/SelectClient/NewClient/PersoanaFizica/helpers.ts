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
  },
  type: 'Individual'
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string()
    .required()
    .min(10, 'Trebuie sa aiba exact 10 cifre')
    .max(10, 'Trebuie sa aiba exact 10 cifre'),
  email: Yup.string().email().required(),
  address: Yup.string().required(),
  county: Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required()
  }),
  city: Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required()
  }),
  type: Yup.string().required()
})
