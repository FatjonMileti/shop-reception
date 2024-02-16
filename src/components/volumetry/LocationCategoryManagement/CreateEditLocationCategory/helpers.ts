import * as Yup from 'yup'

// TODO add interface
export const getInitialValues = editItem => ({
  name: editItem?.name ?? ''
})

// TODO add interface
export const getValidationSchema = item =>
  Yup.object().shape({
    name: Yup.string().required('Acest camp este obligatoriu.')
  })
