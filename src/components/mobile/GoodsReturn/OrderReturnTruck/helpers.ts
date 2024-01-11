import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    location: Yup.string().required('Locația este un câmp obligatoriu'),
    stacks: Yup.number().required('Numărul de stive este un câmp obligatoriu')
  })

export const initialValues = {
  location: '',
  stacks: 25
}