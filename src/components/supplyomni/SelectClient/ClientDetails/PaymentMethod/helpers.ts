import * as Yup from 'yup'

export const initialValues = {
  name: '',
  cif: '',
  tradeRegister: '',
  bank: '',
  bankAccount: '',
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
  type: 'Company'
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  cif: Yup.string().required(),
  tradeRegister: Yup.string().required(),
  bank: Yup.string().required(),
  bankAccount: Yup.string().required(),
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

export const getInitialValues = clientId => ({
  clientId: clientId || '',
  city: {},
  county: {},
  paymentMethod: '',
  deliveryType: '',
  hasDeliveryDate: false,
  hasDifferentDeliveryAddress: false,
  newDeliveryAddress: { address: '' }
})

export const getValidationSchema = () =>
  Yup.object().shape({
    clientId: Yup.string().required(),
    paymentMethod: Yup.string().required('Metoda de plata nu a fost selectata'),
    deliveryType: Yup.string().required('Tipul de livrare nu a fost selectat'),

    hasDeliveryDate: Yup.boolean(),
    hasDifferentDeliveryAddress: Yup.boolean(),

    county: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string()
    }),
    city: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string()
    }),
    newDeliveryAddress: Yup.object().shape({
      address: Yup.string()
    })
  })
