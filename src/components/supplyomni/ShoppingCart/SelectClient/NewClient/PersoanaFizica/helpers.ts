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
  phone: Yup.string().required(),
  email: Yup.string().required(),
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
