import * as Yup from 'yup'

export const getValidationSchema = () =>
  Yup.object().shape({
    shopCodes: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string(),
          value: Yup.string()
        })
      )
      .required('Campul este obligatoriu.'),
    file: Yup.mixed(),
    ruleTypes: Yup.object()
      .shape({
        label: Yup.string().required('Campul este obligatoriu.'),
        value: Yup.string().required('Campul este obligatoriu.')
      }).nonNullable()
      .required('Campul este obligatoriu.')
  })

export const getInitialValues = () => {
  return {
    shopCodes: null,
    file: null,
    ruleTypes: null
  }
}
