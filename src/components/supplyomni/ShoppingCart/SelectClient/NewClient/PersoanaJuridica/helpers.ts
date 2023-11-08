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
  county: '',
  city: ''
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  cif: Yup.string().required(),
  tradeRegister: Yup.string().required(),
  bank: Yup.string().required(),
  bankAccount: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().required(),
  address: Yup.string().required(),
  county: Yup.string().required(),
  city: Yup.string().required()
})
