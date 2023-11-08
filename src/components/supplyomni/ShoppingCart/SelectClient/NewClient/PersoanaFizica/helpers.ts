import * as Yup from 'yup'

export const initialValues = {
  name: '',
  phone: '',
  email: '',
  address: '',
  county: '',
  city: ''
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().required(),
  address: Yup.string().required(),
  county: Yup.string().required(),
  city: Yup.string().required()
})
